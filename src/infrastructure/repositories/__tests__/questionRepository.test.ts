import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getQuestions } from '../questionRepository'
import { getGristQuestions } from '../../gristClient'
import { getReponses } from '../reponsesRepository'
import { Reponse } from '@/domain/types'

// Mock dependencies
vi.mock('../../gristClient', () => ({
    getGristQuestions: vi.fn()
}))

vi.mock('../reponsesRepository', () => ({
    getReponses: vi.fn()
}))

describe('questionRepository', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should transform Grist questions and responses into categories', async () => {
        // Arrange
        const mockGristQuestions = {
            records: [
                {
                    id: 1,
                    fields: {
                        Categorie: 'Security',
                        Question: 'Is 2FA enabled?',
                        Importance: 'High',
                        Tooltip: 'Two-factor authentication'
                    }
                },
                {
                    id: 2,
                    fields: {
                        Categorie: 'Security',
                        Question: 'Are passwords strong?',
                        Importance: 'High',
                        Tooltip: 'Password policy'
                    }
                },
                {
                    id: 3,
                    fields: {
                        Categorie: 'Performance',
                        Question: 'Is caching implemented?',
                        Importance: 'Medium',
                        Tooltip: 'Caching strategy'
                    }
                }
            ]
        }

        const mockReponses: Reponse[] = [
            {
                questionId: '1',
                reponse: 'Yes',
                commentaire: 'Implemented',
                auditId: 123
            }
        ]

        vi.mocked(getGristQuestions).mockResolvedValue(mockGristQuestions)
        vi.mocked(getReponses).mockResolvedValue(mockReponses)

        // Act
        const result = await getQuestions(123)

        // Assert
        expect(result).toHaveLength(2) // Two categories: Security and Performance
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    titre: 'Security',
                    questions: expect.arrayContaining([
                        expect.objectContaining({
                            id: 1,
                            question: 'Is 2FA enabled?',
                            importance: 'High',
                            tooltip: 'Two-factor authentication',
                            reponse: expect.objectContaining({
                                questionId: '1',
                                reponse: 'Yes',
                                commentaire: 'Implemented',
                                auditId: 123
                            })
                        }),
                        expect.objectContaining({
                            id: 2,
                            question: 'Are passwords strong?',
                            importance: 'High',
                            tooltip: 'Password policy',
                            reponse: undefined
                        })
                    ])
                }),
                expect.objectContaining({
                    titre: 'Performance',
                    questions: expect.arrayContaining([
                        expect.objectContaining({
                            id: 3,
                            question: 'Is caching implemented?',
                            importance: 'Medium',
                            tooltip: 'Caching strategy',
                            reponse: undefined
                        })
                    ])
                })
            ])
        )
    })

    it('should handle empty questions from Grist', async () => {
        // Arrange
        const mockGristQuestions = { records: [] }
        const mockReponses: Reponse[] = []

        vi.mocked(getGristQuestions).mockResolvedValue(mockGristQuestions)
        vi.mocked(getReponses).mockResolvedValue(mockReponses)

        // Act
        const result = await getQuestions(123)

        // Assert
        expect(result).toHaveLength(0)
    })

    it('should handle questions without responses', async () => {
        // Arrange
        const mockGristQuestions = {
            records: [
                {
                    id: 1,
                    fields: {
                        Categorie: 'Security',
                        Question: 'Is 2FA enabled?',
                        Importance: 'High',
                        Tooltip: 'Two-factor authentication'
                    }
                }
            ]
        }
        const mockReponses: Reponse[] = []

        vi.mocked(getGristQuestions).mockResolvedValue(mockGristQuestions)
        vi.mocked(getReponses).mockResolvedValue(mockReponses)

        // Act
        const result = await getQuestions(123)

        // Assert
        expect(result).toHaveLength(1)
        expect(result[0].questions[0].reponse).toBeUndefined()
    })

    it('should throw error when getGristQuestions fails', async () => {
        // Arrange
        vi.mocked(getGristQuestions).mockRejectedValue(new Error('Grist API error'))
        vi.mocked(getReponses).mockResolvedValue([])

        // Act & Assert
        await expect(getQuestions(123)).rejects.toThrow('Grist API error')
    })

    it('should throw error when getReponses fails', async () => {
        // Arrange
        vi.mocked(getGristQuestions).mockResolvedValue({ records: [] })
        vi.mocked(getReponses).mockRejectedValue(new Error('Responses API error'))

        // Act & Assert
        await expect(getQuestions(123)).rejects.toThrow('Responses API error')
    })
}) 