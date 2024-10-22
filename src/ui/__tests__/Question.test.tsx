import { afterEach, describe, expect, it, test, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { Audit, Question as QuestionType } from '@/domain/types'
import { mock } from 'vitest-mock-extended';
import Question from '../Question';
import { resetReponse, saveReponse } from "@/infrastructure/repositories/reponsesRepository";

const audit = {
    ...mock<Audit>(),
    cloture: false,
};
const question = {
    ...mock<QuestionType>(), 
    question: 'Une question de toute première importance ?',
}
afterEach(() => {
    cleanup();
});

describe('Test Question component in form mode', async () => {
    

    it('should render properly in form mode', async () => {
        render(<Question audit={audit} question={question}/>)
        expect(screen.getByText('Une question de toute première importance ?')).toBeDefined();
    })

    it('should send reponses to the server', async () => {
        //const mockedSaveReponse = vi.fn().mockImplementation(saveReponse);

        render(<Question audit={audit} question={question}/>)
        screen.getByLabelText("Oui").click()
        
        await screen.findByText("Répondue");
        
        // TODO We should check if the call to the server havec been made
        //expect(mockedSaveReponse).toHaveBeenCalledOnce();
    })  
})

describe('Test Question component in display mode', async () => {
    

    it('should render properly', async () => {
        render(<Question audit={{...audit, cloture: true}} question={question}/>)
        expect(screen.getByText('Une question de toute première importance ?')).toBeDefined();
    })
})