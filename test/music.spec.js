const request = require('supertest');
const should = require('should');
const app = require('../app');
const models = require('../models/Music');

describe('GET /api/v1/music 악보 정보 조회', () => {
    describe('성공시', () => {
        let response;
        before(async (done) => {
            request(app)
                .get('/api/v1/music')
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    response = res;
                    done();
                });
        });
        it('악보 객체를 담은 배열을 응답한다', () => {
            response.body.should.be.instanceof(Array);
            response.body.forEach(item => {
                item.should.have.properties('exchangeId', 'market');
                item.exchangeId.should.be.a.Number;
                item.market.should.be.a.String;
                if (id) item.id.should.be.equal(id);
            });
        });
    });
});
