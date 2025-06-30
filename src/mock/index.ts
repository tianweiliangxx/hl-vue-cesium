import Mock from "mockjs";

Mock.mock("/mock/api/getPoints", "get", {
    "code": 200,
    "result|4-10": [
        {
            "id|+1": 1,

            // 在范围内随机生成坐标点
            "latitude": () => Mock.mock('@float(39.100, 39.110)'),
            "longitude": () => Mock.mock('@float(117.00, 117.10)'),
            // 随机生成一个城市名称
            "psName": () => Mock.mock('@city'),

            // 随机类型
            "type": () => Mock.mock('@natural(1, 3)')
        }
    ],
    "message": "成功"
})