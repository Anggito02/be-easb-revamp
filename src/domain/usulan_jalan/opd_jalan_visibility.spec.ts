import { buildOpdUsulanVisibilityWhere } from './opd_jalan_visibility';

describe('buildOpdUsulanVisibilityWhere', () => {
    it('without room kabkota uses owner-only filter', () => {
        const { clause, params } = buildOpdUsulanVisibilityWhere({
            idOpd: 10,
            roomKabkotaId: null,
        });
        expect(clause).toContain('idOpd = :idOpd');
        expect(params).toEqual({ idOpd: 10 });
    });

    it('with room kabkota ORs shared approved same kabkota with owner rows', () => {
        const { clause, params } = buildOpdUsulanVisibilityWhere({
            idOpd: 10,
            roomKabkotaId: 5,
        });
        expect(clause).toContain('idOpd = :idOpd');
        expect(clause).toContain('idUsulanJalanStatus = 3');
        expect(clause).toContain('idKabkota = :roomKabkotaId');
        expect(params).toEqual({ idOpd: 10, roomKabkotaId: 5 });
    });

    it('respects custom alias', () => {
        const { clause, params } = buildOpdUsulanVisibilityWhere(
            { idOpd: 1, roomKabkotaId: 2 },
            'e',
        );
        expect(clause.includes('e.idOpd')).toBe(true);
        expect(params.roomKabkotaId).toBe(2);
    });
});
