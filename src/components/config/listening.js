export const grammar = [
    {
        id: 1,
        question: "Hỏi giá cả: \n How much is/ was...? Are/ were...? \n How much....cost? \n What is the price of....? \n What is the estimate....?",
        result: "dollar(s) / cents"
    },
    {
        id: 2,
        question: "How often...?",
        result: "- Usually, often, sometimes,... \n - Every_____(everyday, everyweek,...) \n  ...|- Once a day /week /... \n  ...|- Twice a day /... \n  ...|- Three times a day / week..."
    },
    {
        id: 3,
        question: "Câu hỏi có: \n DO YOU KNOW + _WHO_ ...? \n Can You Tell Me + _WHERE_ ...?",
        result: "Trả lời cho từ ngay khoảng trống. \n Ex: trả lời cho 'Who', 'Where'"
    },
    {
        id: 4,
        question: "Câu hỏi có từ để hỏi =>",
        result: "Loại bỏ câu trả lời có 'Yes/ No'"
    },
    {
        id: 5,
        question: "Câu hỏi có 'Who' =>",
        result: "Tên người \n Danh từ chỉ người \n Department (Phòng, ban) \n It hasn't been decided yet"
    },
    {
        id: 6,
        question: "' Whose...? '",
        result: "Belong to/ own \n Mine/ his/ hers/ yours/... \n Tên's ( Ex.John's ) "
    },
    {
        id: 7,
        question: "' Which + Noun + ...?' ",
        result: "...One/ones..."
    },
    {
        id: 8,
        question: "- What time is it ?",
        result: "It's + giờ"
    },
    {
        id: 9,
        question: "- What time does/ do/ did + S + start/ begin/ finish/ ...?",
        result: "- Không dùng ' It's... ' \n - Dùng At / about / in + time."
    },
    {
        id: 10,
        question: "What do you think about ...? \n What is your opinion ...? \n How + (be) + S + ......?",
        result: " Câu trả lời là có Adj \n Ex: How is everything ? => It's fine "
    },
    {
        id: 11,
        question: "WHERE ?",
        result: " Drawer/ corner/ at the end of the hall/ \n Cabinet/ supply closet/ on the ___ floor/ ... "
    },
    {
        id: 12,
        question: "Where is the fastest way to ____?\n ....get to ____? \n....go to ____ ?",
        result: " Overthere \n Next to/ opposite/ across... \n Blocks away "
    },
    {
        id: 13,
        question: "- Why did you leave early ?",
        result: " ...doctor's (appointment) \n dentist's (appointment)\n to catch the flight "
    },
    {
        id: 14,
        question: " How many ...?",
        result: " - Số Lượng \n - A dozen (1 lố, 1 tá,...) "
    },
    {
        id: 15,
        question: " How ...Get / go ... there / here / to ...?",
        result: " - By bus/ car/... \n S + walk \n On foot \n S + drive/ fly..."
    },
    {
        id: 16,
        question: " How far is it ... ?",
        result: " _2_ Blocks away \n _3_Kilometre(s)/ metre(s) \n _4_miles \n _5_minutes walk/ drive/ ..."
    },
    {
        id: 17,
        question: " How well ... ?",
        result: " - So so \n - Not bad \n -Pretty good \n - Just a litte"
    },
    {
        id: 18,
        question: " How do you like your steak ?",
        result: " - Well done (chín) \n - Undercooked (tái)"
    },
    {
        id: 19,
        question: " What are the hours of ...? \n = When does/ do/ did/ + S + open/ close ?",
        result: " S + open from __9 giờ__ to __5 giờ__"
    },
    {
        id: 20,
        question: " How late ...open ? <=> When ... close ?",
        result: " At / about / around + time"
    },
    {
        id: 21,
        question: " Câu hỏi lựa chọn:...",
        result: " A / B (chọn 1 trong 2) \n Both \n Neither... \n Either..."
    },
    {
        id: 22,
        question: " Câu mời/ đề nghị: \n - Would you like to Vo ...? \n - Why don't we + Vo....? \n - Let's...? \n - What about....? \n - How about....?",
        result: " - Great! # No, thanks \n - Great idea! # I'd love to, but.... \n - That's a good idea # I'm afraid \n - That sounds like fun! # Sorry. I have other plans \n - Let's _Vo_ # ..."
    },
    {
        id: 23,
        question: " Would you like me + to Vo ...? => đề nghị giúp đỡ người khác",
        result: " - Thanks. I'd appreciate that \n - That / It is very kind of you \n - Thanks, but...."
    },
    {
        id: 24,
        question: " Can / could you + Vo ...? \n - Why don't ....you + Vo ... ? \n - Let's ...? \n - How about...? \n - What about....?",
        result: " Sure \n - Certainly \n - Of course \n - Sory, ..."
    },
    {
        id: 25,
        question: " Which bus ...?",
        result: " Trả lời có số (Ex: Take the number 14 bus)"
    },
    {
        id: 26,
        question: " It's supposed to -> rain <- tomorrow.",
        result: " Trả lời: .....the beach."
    },
]