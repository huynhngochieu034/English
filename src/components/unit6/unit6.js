import React, { Component } from 'react';
import Header from '../headers/header';
import './unit6.css';

class Practice5 extends Component {

    constructor(props) {
        super(props);
        this.state = {
    
        }
    }

    render() {
        return (
            <div className="practice2">
                <Header></Header>
        
                <div className="container">
                <h4>LISTENING PART 1:    PICTURE DESCRIPTION ( HÌNH )</h4>
                <div className="card justify-content-center align-items-center" style={{color:"black"}}>
                    <strong style={{ padding:"10px"}}>1. Nghe từng câu <strong>tìm <u>1 từ sai</u></strong> để loại <strong><u style={{color:"red"}}>BỎ</u></strong></strong>
                    <strong style={{ padding:"10px"}}>2. Hình trưng bày đồ bán, <u>không</u> có <u>người</u> thì chọn: <strong><u>"Display"</u></strong> hoặc <strong><u>"Layout"</u></strong></strong>
                    <strong style={{ padding:"10px"}}>3. Hình có 1 người làm cùng 1 lúc 2 hoặc 3 việc => <strong>"He/ She is doing 2,3,4 things at once."</strong> </strong>
                    <strong style={{ padding:"10px"}}>4. Hình ở công viên có <strong><u>cột đèn: => Lamppost</u></strong></strong>
                    <strong style={{ padding:"10px"}}>5. Hình có <strong>người đang ngồi</strong> mà nghe có cụm từ: <strong style={{color:"red"}}>IS/ ARE ABOUT TO SIT</strong> là <strong>BỎ</strong></strong>
                    <strong style={{ padding:"10px"}}>6. Hình có <strong>kệ sách</strong> mà nghe: <strong style={{color:"red"}}>INSTALLING/ BEING INSTALLED</strong> là <strong>BỎ</strong></strong>
                </div>
                </div>
            </div>
        );
    }
}

export default Practice5;