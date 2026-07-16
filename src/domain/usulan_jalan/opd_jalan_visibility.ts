/**
 * SQL fragment and params for OPD usulan jalan read scope:
 * - No room kabkota: only rows owned by this OPD.
 * - With room kabkota: shared approved (status 3) for same kabkota OR owned by this OPD for any status.
 */
export type OpdJalanReadScope = { idOpd: number; roomKabkotaId: number | null };

export type UsulanJalanFindByIdOpdOptions =
    | { mode: 'read'; scope: OpdJalanReadScope }
    | { mode: 'strict'; idOpd: number };

export function buildOpdUsulanVisibilityWhere(
    scope: OpdJalanReadScope,
    /** Alias for usulan_jalan in QueryBuilder (default "uj") */
    alias = 'uj',
): { clause: string; params: Record<string, number> } {
    const { idOpd, roomKabkotaId } = scope;
    if (roomKabkotaId == null) {
        return {
            clause: `${alias}.idOpd = :idOpd`,
            params: { idOpd },
        };
    }
    return {
        clause: `(${alias}.idOpd = :idOpd OR (${alias}.idUsulanJalanStatus = 3 AND ${alias}.idKabkota = :roomKabkotaId))`,
        params: { idOpd, roomKabkotaId },
    };
}
