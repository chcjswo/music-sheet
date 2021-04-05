const Music = require('../../models/Music');

/**
 * 리스트
 */
const list = async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*');
        const list = await Music.find();

        return res.json({
            list
        });
    } catch (err) {
        console.error('error ===> ', err);
        return res.status(500).json({
            message: '악보 조회중 에러가 발생했습니다.'
        });
    }
};

/**
 * 악보 추가
 */
const create = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: '데이터가 없습니다.'
        });
    }

    let regDate = new Date();
    regDate.setHours(regDate.getHours() + 9);

    const musicData = {
        room_name: req.body.roomName,
        room_pass: req.body.roomPass,
        music_sheet: req.body.musicSheet,
        reg_date: regDate
    }

    const data = await Music.findOne({
        room_name: musicData.room_name
    });

    if (data) {
        return res.status(400).json({
            message: '이름 등록된 방이름입니다.'
        });
    }

    try {
        const newMusic = new Music(musicData);
        const data = await newMusic.save();
        return res.status(201).json([data]);
    } catch (err) {
        console.error('error ===> ', err);
        return res.status(500).json({
            message: '악보 등록중 에러가 발생했습니다.'
        });
    }
};

/**
 * 악보 삭제
 */
const removeSheet = async (req, res) => {
    const _id = req.params.id;

    if (!_id) {
        return res.status(400).json({
            message: '삭제할 ID가 없습니다.'
        });
    }

    try {
        const result = await Music.deleteOne({
            _id
        });

        if (!result) {
            return res.status(204).json({
                message: '삭제할 악보가 없습니다.'
            });
        }

        return res.status(200).end();
    } catch (err) {
        console.error('error ==> ', err);
        return res.status(500).json({
            message: '악보 삭제중 에러가 발생했습니다.'
        });
    }
};

/**
 * 방 입장
 */
const entranceRoom = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: '데이터가 없습니다.'
        });
    }

    const findData = {
        room_name: req.body.roomName,
        room_pass: req.body.roomPass
    }

    const data = await Music.findOne(findData);

    if (!data) {
        return res.status(404).json({
            message: '해당하는 방이 없습니다.'
        });
    }
    return res.status(200).json(data);
};

module.exports = {
    list,
    create,
    removeSheet,
    entranceRoom
};
