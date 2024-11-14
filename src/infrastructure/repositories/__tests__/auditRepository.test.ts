import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getAudit } from '../auditRepository';
import { getGristAudit, getGristProduit } from '../../gristClient';

// Mock the gristClient functions
vi.mock('../../gristClient', () => ({
    getGristAudit: vi.fn(),
    getGristProduit: vi.fn(),
}));

describe('auditRepository', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        vi.clearAllMocks();
    });

    it('should return null when auditHash is null', async () => {
        const result = await getAudit(null);
        expect(result).toBeNull();
        expect(getGristAudit).not.toHaveBeenCalled();
        expect(getGristProduit).not.toHaveBeenCalled();
    });

    it('should return null when gristAudit is not found', async () => {
        vi.mocked(getGristAudit).mockResolvedValue(null);

        const result = await getAudit('non-existent-hash');
        
        expect(result).toBeNull();
        expect(getGristAudit).toHaveBeenCalledWith('non-existent-hash');
        expect(getGristProduit).not.toHaveBeenCalled();
    });

    it('should return formatted audit when both gristAudit and gristProduit are found', async () => {
        const mockGristAudit = {
            id: 123,
            fields: {
                Date_comite_d_investissment: 1609459200, // 2021-01-01
                Cloture: true,
                Cloture_le: 1609545600, // 2021-01-02
                Produit: 'product-ref-1'
            }
        };

        const mockGristProduit = {
            id: 456,
            fields: {
                Nom: 'Test Product'
            }
        };

        vi.mocked(getGristAudit).mockResolvedValue(mockGristAudit);
        vi.mocked(getGristProduit).mockResolvedValue(mockGristProduit);

        const result = await getAudit('valid-hash');

        expect(result).toEqual({
            id: 123,
            dateComiteInvestissement: new Date('2021-01-01T00:00:00.000Z'),
            cloture: true,
            clotureLe: new Date('2021-01-02T00:00:00.000Z'),
            produit: {
                id: 456,
                nom: 'Test Product'
            }
        });

        expect(getGristAudit).toHaveBeenCalledWith('valid-hash');
        expect(getGristProduit).toHaveBeenCalledWith('product-ref-1');
    });

    it('should handle error cases gracefully', async () => {
        vi.mocked(getGristAudit).mockRejectedValue(new Error('Grist API error'));

        await expect(getAudit('error-hash')).rejects.toThrow('Grist API error');
        expect(getGristAudit).toHaveBeenCalledWith('error-hash');
        expect(getGristProduit).not.toHaveBeenCalled();
    });
}); 