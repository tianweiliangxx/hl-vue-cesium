import type { Result } from './models/Result';
import type { Point } from './models/Point';

import { get } from "@/utils/request"

// 获取点位数据
export function getPoints() {
    return get<Point[]>('getPoints')
}