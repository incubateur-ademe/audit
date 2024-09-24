import { Collaborateur, Startup } from "../domain/types";
import { getGristStartups, saveCollaborateurs, setStartupMembers } from "../infrastructure/gristClient";
import axios from "axios";

interface StartupBeta {
    active_members: string[]
    name: string
}

interface MappedStartup extends Startup {
    beta: StartupBeta
}

const betaClient = axios.create({
    baseURL: 'https://beta.gouv.fr/api/v2.6'
});

(async () => {
    console.log('Start importation');

    const startups: Record<string, StartupBeta> = (await betaClient.get('/startups_details.json')).data;

    const startupsIncubateur = (await getGristStartups());
    
    const mappingStartups: Record<string, MappedStartup> = startupsIncubateur.reduce((acc, startup: Startup) => {
        if (startup.idBeta !== '' && startups[startup.idBeta]) {
            return {
                [startup.idBeta]: {
                    ...startup,
                    beta: startups[startup.idBeta],
                },
                ...acc
            }
        }
        return acc;
    }, {});

    const authors: Record<string, Collaborateur> = (await betaClient.get('/authors.json')).data.reduce((acc: Record<string, any>, author: any) => {

        return {
            ...acc,
            [author.id]: {
                idBeta: author.id,
                nomComplet: author.fullname,
                domaine: author.domaine,
            }
        };
    }, {});

    for (const startup of Object.values(mappingStartups)) {
        const members = await saveCollaborateurs(startup.beta.active_members.map((member) => authors[member]));

        await setStartupMembers(startup, members);
    }

    console.log('...end importation');
})();
