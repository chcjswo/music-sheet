const Music = require("../../models/Music");


/**
 * 리스트
 */
const list = async (req, res) => {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        const list = await Music.find();

        return res.json({
            list
        });
    } catch (err) {
        console.error("error ===> ", err);
        return res.status(500).json({
            message: "악보 조회중 에러가 발생했습니다."
        });
    }
};


/**
 * 악보 추가
 */
const create = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: "데이터가 없습니다."
        });
    }

    try {
        const newMusic = new Music({
            room_name: req.body.roomName,
            room_pass: req.body.roomPass,
            music_sheet: req.body.musicSheet,
        });
        const data = await newMusic.save();
        return res.status(201).json([data]);
    } catch (err) {
        console.error("error ===> ", err);
        return res.status(500).json({
            message: "악보 등록중 에러가 발생했습니다."
        });
    }
};

// const randomRestaurant = async () => {
//     const restaurantList = await Restaurant.find();
//     const index = Math.floor(Math.random() * restaurantList.length);
//     const restaurantData = restaurantList[index];
//
//     await Lunch.deleteOne({
//         lunch_date: util.getCurrentDate()
//     });
//
//     // 선택 카운트 업데이트
//     restaurantData.choiceCount++;
//
//     await Restaurant.updateOne({
//         _id: restaurantData._id
//     }, {
//         $inc: {
//             choiceCount: 1
//         }
//     });
//
//     return restaurantData;
// };

// /**
//  * 식당 삭제
//  */
// const removeRestaurant = async (req, res) => {
//     const no = req.body.no;
//
//     if (!no) {
//         return res.status(400).json({
//             message: "데이터가 없습니다."
//         });
//     }
//
//     try {
//         const result = await Restaurant.deleteOne({
//             _id: no
//         });
//
//         if (!result) {
//             return res.status(404).json({
//                 message: "삭제할 식당이 없습니다."
//             });
//         }
//
//         return res.status(201).end();
//     } catch (err) {
//         console.error("error ==> ", err);
//         return res.status(500).json({
//             message: "식당 삭제중 에러가 발생했습니다."
//         });
//     }
// };
//
// /**
//  * 랜덤 식당 선택
//  */
// const choice = async (req, res) => {
//     try {
//         const restaurantData = await randomRestaurant();
//
//         if (!restaurantData) {
//             return res.status(404).json({
//                 message: "선택할 식당이 없습니다."
//             });
//         }
//
//         if (!restaurantData) {
//             return res.status(404).json({
//                 message: "선택할 식당이 없습니다."
//             });
//         }
//
//         return res.status(201).json(restaurantData);
//     } catch (err) {
//         console.error("error ==> ", err.message);
//         return res.status(500).json({
//             message: "식당 선택중 에러가 발생했습니다."
//         });
//     }
// };
//
// /**
//  * 점심 삭제
//  */
// const removeLunch = () => {
//     Lunch.deleteOne({
//         lunch_date: util.getCurrentDate()
//     });
// };
//
// /**
//  * 방문수 업데이트
//  * @param no 고유번호
//  */
// const updateVisitCount = (no) => {
//     return Restaurant.updateOne({
//         _id: no
//     }, {
//         $inc: {
//             visitCount: 1
//         }
//     });
// };
//
// /**
//  * 식당 결정
//  */
// const decision = async (req, res) => {
//     const no = req.body.no;
//
//     if (!no) {
//         return res.status(400).json({
//             message: "데이터가 없습니다."
//         });
//     }
//
//     try {
//         await removeLunch();
//
//         // 방문수 업데이트
//         const result = await updateVisitCount(no);
//
//         if (!result) {
//             return res.status(404).json({
//                 message: "선택할 식당이 없습니다."
//             });
//         }
//
//         if (!result) {
//             return res.status(404).json({
//                 message: "선택할 식당이 없습니다."
//             });
//         }
//
//         // 결정된 식당 조회
//         const restaurant = await Restaurant.findOne({
//             _id: no
//         });
//
//         const newLunch = new Lunch({
//             lunch_date: util.getCurrentDate(),
//             restaurant_name: restaurant.name
//         });
//
//         // 오늘의 식당 입력
//         const resultRestaurant = await newLunch.save();
//
//         // util.sendSlack(`${util.getCurrentDate()} 오늘의 점심은 *${restaurant.name}* 입니다.`, 2, null, (err) => {
//         //     if (err) {
//         //         console.error('에러 발생 ===> ', err);
//         //         return res.status(500).end(err);
//         //     }
//         //     return res.status(201).json({result: resultRestaurant});
//         // });
//
//         return res.status(201).json({result: resultRestaurant});
//     } catch (err) {
//         console.error("error ==> ", err);
//         return res.status(500).json({
//             message: "식당 선택중 에러가 발생했습니다."
//         });
//     }
// };
//
// /**
//  * 랜덤 식당 선택 후 슬랙으로 메시지 보내기
//  */
// const sendSlack = async (req, res) => {
//     try {
//         const restaurantData = await randomRestaurant();
//
//         if (!restaurantData) {
//             return res.status(404).json({
//                 message: "선택할 식당이 없습니다."
//             });
//         }
//
//         // util.sendSlack(`${util.getCurrentDate()} 오늘의 점심은 *${restaurantData.name}* 어떠세요?`, 1, restaurantData._id, (err) => {
//         //     if (err) {
//         //         console.error('에러 발생 ===> ', err);
//         //         return res.status(500).end(err);
//         //     }
//         //     return res.status(201).end();
//         // });
//     } catch (err) {
//         console.error("error ==> ", err.message);
//         return res.status(500).json({
//             message: "식당 선택중 에러가 발생했습니다."
//         });
//     }
// };
//
// /**
//  * 식당 선택 후 슬랙으로 메시지 보내기
//  */
// const choiceSlack = async (req, res) => {
//     const no = req.params.no;
//
//     try {
//         //  점심 삭제
//         await removeLunch();
//
//         // 방문수 업데이트
//         await updateVisitCount(no);
//
//         // 결정된 식당 조회
//         const restaurant = await Restaurant.findOne({
//             _id: no
//         });
//
//         const newLunch = new Lunch({
//             lunch_date: util.getCurrentDate(),
//             restaurant_name: restaurant.name
//         });
//
//         // 오늘의 식당 입력
//         await newLunch.save();
//
//         // util.sendSlack(`${util.getCurrentDate()} 오늘의 점심은 *${restaurant.name}* 입니다.`, 2, null, (err) => {
//         //     if (err) {
//         //         console.error('에러 발생 ===> ', err);
//         //         return res.status(500).end(err);
//         //     }
//         //     return res.render("index");
//         // });
//
//         return res.render("index");
//     } catch (err) {
//         console.error("error ==> ", err.message);
//         return res.render("index");
//     }
// };
//
// const checkSlack = (req, res) => {
//     console.log(req);
//     return res.end();
// };

module.exports = {
    list,
    create,
    // removeRestaurant,
    // choice,
    // decision,
    // sendSlack,
    // choiceSlack,
    // checkSlack,
    // randomRestaurant
};
