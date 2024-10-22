import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
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

describe('Test Question component', () => {
    
    render(<Question audit={audit} question={question}/>)
    const mockedSaveReponse = vi.fn().mockImplementation(saveReponse);

    it('should render properly', () => {
        expect(screen.getByText('Une question de toute première importance ?')).toBeDefined();
    })

    it('should send reponses to the server', async () => {
        screen.getByLabelText("Oui").click()
        
        await screen.findByText("Répondue");
        
        // TODO We should check if the call to the server havec been made
        //expect(mockedSaveReponse).toHaveBeenCalledOnce();
    })
    
})