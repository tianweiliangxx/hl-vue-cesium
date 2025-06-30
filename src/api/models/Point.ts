import type { Result } from './Result';

export interface Point {
    // 点位id
    id: number,
    // 经纬度
    latitude: number,
    longitude: number,
    // 点位名称
    psName: string,
    // 点位类型
    type: number
}