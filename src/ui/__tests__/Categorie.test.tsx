import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Categorie from '../Categorie'
import { Audit, Categorie as CategorieType, Question } from '@/domain/types'
import { mock } from 'vitest-mock-extended';

const audit = mock<Audit>();
const categorie = {
    ...mock<CategorieType>(),
    titre: 'Titre de catégorie',
    questions: [{
         ...mock<Question>(), 
         question: 'Une question de toute première importance ?'
    }]
}

test('Page', () => {
    render(<Categorie audit={audit} categorie={categorie}/>)
    expect(screen.getByTitle('Titre de catégorie')).toBeDefined()
    expect(screen.getByText('Une question de toute première importance ?')).toBeDefined();
})