import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getReponses, getReponse, saveReponse, reponseId, saveReponses } from '../reponsesRepository'
import { getGristReponse, getGristReponses, saveGristReponses } from '../../gristClient'
import { Reponse, REPONSE_OPTIONS } from '@/domain/types'

// Mock dependencies
vi.mock('../../gristClient', () => ({
    getGristReponses: vi.fn(),
    getGristReponse: vi.fn(),
    saveGristReponses: vi.fn()
}))

describe('reponsesRepository', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    describe('getReponses', () => {
        it('should transform Grist responses into Reponse objects', async () => {
            // Arrange
            const mockGristReponses = [
                {
                    id: 1,
                    fields: {
                        Audit: 123,
                        Question: 456,
                        Reponse: 'Oui',
                        Commentaires_Details: 'Test comment',
                        Pourcentage: 75
                    }
                }
            ]

            vi.mocked(getGristReponses).mockResolvedValue(mockGristReponses)

            // Act
            const result = await getReponses(123)

            // Assert
            expect(result).toEqual([
                {
                    id: 1,
                    auditId: 123,
                    questionId: 456,
                    reponse: REPONSE_OPTIONS.OUI,
                    commentaire: 'Test comment',
                    pourcentage: 75
                }
            ])
        })

        it('should handle empty responses', async () => {
            // Arrange
            vi.mocked(getGristReponses).mockResolvedValue([])

            // Act
            const result = await getReponses(123)

            // Assert
            expect(result).toEqual([])
        })
    })

    describe('getReponse', () => {
        it('should get a single response', async () => {
            // Arrange
            const mockGristReponse = {
                id: 1,
                fields: {
                    Audit: 123,
                    Question: 456,
                    Reponse: 'Yes',
                    Commentaires_Details: 'Test comment',
                    Pourcentage: 75
                }
            }

            vi.mocked(getGristReponse).mockResolvedValue(mockGristReponse)

            // Act
            const result = await getReponse(123, 456)

            // Assert
            expect(result).toEqual({
                id: 1,
                auditId: 123,
                questionId: 456,
                reponse: 'Yes',
                commentaire: 'Test comment',
                pourcentage: 75
            })
        })
    })

    describe('saveReponse with packing mechanism', () => {
        it('should pack multiple responses and save them together', async () => {
            // Arrange
            const mockReponse1: Reponse = {
                auditId: 123,
                questionId: 456,
                reponse: REPONSE_OPTIONS.OUI,
                commentaire: 'Test',
                pourcentage: null
            }

            const mockReponse2: Reponse = {
                auditId: 123,
                questionId: 457,
                reponse: REPONSE_OPTIONS.NON,
                commentaire: 'Test 2',
                pourcentage: 50
            }

            // Act
            await saveReponse(mockReponse1)
            await saveReponse(mockReponse2)

            // Fast-forward timer
            await vi.runAllTimersAsync()

            // Assert
            expect(vi.mocked(saveGristReponses)).toHaveBeenCalledTimes(1)
            expect(vi.mocked(saveGristReponses)).toHaveBeenCalledWith(
                expect.arrayContaining([
                    {
                        require: {
                            Audit: 123,
                            Question: 456
                        },
                        fields: {
                            Reponse: 'Oui',
                            Commentaires_Details: 'Test',
                            Pourcentage: null
                        }
                    },
                    {
                        require: {
                            Audit: 123,
                            Question: 457
                        },
                        fields: {
                            Reponse: 'Non',
                            Commentaires_Details: 'Test 2',
                            Pourcentage: 50
                        }
                    }
                ])
            )
        })

        it('should force save when reaching more than 40 responses', async () => {
            // Arrange
            const responses: Reponse[] = Array.from({ length: 42 }, (_, i) => ({
                auditId: 123,
                questionId: i,
                reponse: REPONSE_OPTIONS.OUI,
                commentaire: `Test ${i}`,
                pourcentage: null
            }))

            // Act
            for (const response of responses) {
                await saveReponse(response)
            }

            // Assert
            expect(vi.mocked(saveGristReponses)).toHaveBeenCalled()
        })
    })

    describe('saveReponses', () => {
        it('should transform and save responses correctly', async () => {
            // Arrange
            const responses: Reponse[] = [
                {
                    auditId: 123,
                    questionId: 456,
                    reponse: REPONSE_OPTIONS.OUI,
                    commentaire: 'Test',
                    pourcentage: null
                }
            ]

            // Act
            await saveReponses(responses)

            // Assert
            expect(saveGristReponses).toHaveBeenCalledWith([
                {
                    require: {
                        Audit: 123,
                        Question: 456
                    },
                    fields: {
                        Reponse: 'Oui',
                        Commentaires_Details: 'Test',
                        Pourcentage: null
                    }
                }
            ])
        })

        it('should handle reset flag correctly', async () => {
            // Arrange
            const responses: Reponse[] = [
                {
                    auditId: 123,
                    questionId: 456,
                    reponse: null,
                    commentaire: null,
                    pourcentage: null,
                    reset: true
                }
            ]

            // Act
            await saveReponses(responses)

            // Assert
            expect(saveGristReponses).toHaveBeenCalledWith([
                {
                    require: {
                        Audit: 123,
                        Question: 456
                    },
                    fields: {
                        Reponse: null,
                        Commentaires_Details: null,
                        Pourcentage: null
                    }
                }
            ])
        })
    })

    describe('reponseId', () => {
        it('should generate correct response ID', async () => {
            // Arrange
            const reponse: Reponse = {
                auditId: 123,
                questionId: 456,
                reponse: REPONSE_OPTIONS.OUI,
                commentaire: null,
                pourcentage: null
            }

            // Act
            const result = await reponseId(reponse)

            // Assert
            expect(result).toBe('123-456')
        })
    })
}) 