// // Convert inputs to numbers
// let numA = Number(a);
// let numB = Number(b);

// // Perform addition
// console.log(numA + numB);

// const a = 5;
// const b = 10;
// const result = `Tong cua ${a} va ${b} la ${a + b}.`;
// console.log(result);

// const product = "Laptop";
// const price = 1500;
// const vat = 0.1;
// const totalPrice = price + price * vat;

// const income =
//     ` Product : $ ${product}
//     Price : ${price}
//     VAT : ${vat * 100}%
//     Total price: ${totalPrice}`;
// console.log(income);

// let number = [1, 2, 3, 4, 5];
// let updateNumber = number.find((num) => num > 2);
// console.log(updateNumber);


const students = [
  {
    name: "An",
    scores: {
      Toan: { score: 7.4, evaluation: "Đ" },
      NguVan: { score: 8.9, evaluation: "Đ" },
      NgoaiNgu: { score: 8.5, evaluation: "Đ" },
      VatLy: { score: 9.0, evaluation: "Đ" },
      HoaHoc: { score: 3.9, evaluation: "KĐ" },
      SinhHoc: { score: 5.0, evaluation: "Đ" },
      LichSu: { score: 8.3, evaluation: "Đ" },
      DiaLy: { score: 9.4, evaluation: "Đ" },
      GDCD: { score: 6.6, evaluation: "Đ" },
    },
  },
  {
    name: "Binh",
    scores: {
      Toan: { score: 3.4, evaluation: "KĐ" },
      NguVan: { score: 5.9, evaluation: "Đ" },
      NgoaiNgu: { score: 5.4, evaluation: "Đ" },
      VatLy: { score: 7.4, evaluation: "Đ" },
      HoaHoc: { score: 9.3, evaluation: "Đ" },
      SinhHoc: { score: 8.6, evaluation: "Đ" },
      LichSu: { score: 5.2, evaluation: "Đ" },
      DiaLy: { score: 7.1, evaluation: "Đ" },
      GDCD: { score: 6.7, evaluation: "Đ" },
    },
  },
  {
    name: "Chi",
    scores: {
      Toan: { score: 5.5, evaluation: "Đ" },
      NguVan: { score: 3.7, evaluation: "KĐ" },
      NgoaiNgu: { score: 3.9, evaluation: "KĐ" },
      VatLy: { score: 8.1, evaluation: "Đ" },
      HoaHoc: { score: 7.4, evaluation: "Đ" },
      SinhHoc: { score: 7.6, evaluation: "Đ" },
      LichSu: { score: 3.9, evaluation: "KĐ" },
      DiaLy: { score: 8.4, evaluation: "Đ" },
      GDCD: { score: 5.2, evaluation: "Đ" },
    },
  },
  {
    name: "Dung",
    scores: {
      Toan: { score: 9.1, evaluation: "Đ" },
      NguVan: { score: 5.5, evaluation: "Đ" },
      NgoaiNgu: { score: 4.4, evaluation: "KĐ" },
      VatLy: { score: 4.6, evaluation: "KĐ" },
      HoaHoc: { score: 6.4, evaluation: "Đ" },
      SinhHoc: { score: 3.2, evaluation: "KĐ" },
      LichSu: { score: 6.3, evaluation: "Đ" },
      DiaLy: { score: 9.4, evaluation: "Đ" },
      GDCD: { score: 8.7, evaluation: "Đ" },
    },
  },
  {
    name: "Em",
    scores: {
      Toan: { score: 7.1, evaluation: "Đ" },
      NguVan: { score: 9.2, evaluation: "Đ" },
      NgoaiNgu: { score: 8.7, evaluation: "Đ" },
      VatLy: { score: 4.4, evaluation: "KĐ" },
      HoaHoc: { score: 6.4, evaluation: "Đ" },
      SinhHoc: { score: 3.0, evaluation: "KĐ" },
      LichSu: { score: 5.0, evaluation: "Đ" },
      DiaLy: { score: 9.8, evaluation: "Đ" },
      GDCD: { score: 7.0, evaluation: "Đ" },
    },
  },
  {
    name: "Phuc",
    scores: {
      Toan: { score: 5.5, evaluation: "Đ" },
      NguVan: { score: 4.7, evaluation: "KĐ" },
      NgoaiNgu: { score: 4.2, evaluation: "KĐ" },
      VatLy: { score: 6.5, evaluation: "Đ" },
      HoaHoc: { score: 3.5, evaluation: "KĐ" },
      SinhHoc: { score: 8.1, evaluation: "Đ" },
      LichSu: { score: 6.4, evaluation: "Đ" },
      DiaLy: { score: 7.0, evaluation: "Đ" },
      GDCD: { score: 8.0, evaluation: "Đ" },
    },
  },
  {
    name: "Giau",
    scores: {
      Toan: { score: 5.8, evaluation: "Đ" },
      NguVan: { score: 6.3, evaluation: "Đ" },
      NgoaiNgu: { score: 3.1, evaluation: "KĐ" },
      VatLy: { score: 9.0, evaluation: "Đ" },
      HoaHoc: { score: 7.4, evaluation: "Đ" },
      SinhHoc: { score: 7.7, evaluation: "Đ" },
      LichSu: { score: 5.5, evaluation: "Đ" },
      DiaLy: { score: 5.3, evaluation: "Đ" },
      GDCD: { score: 5.6, evaluation: "Đ" },
    },
  },
  {
    name: "Hieu",
    scores: {
      Toan: { score: 6.9, evaluation: "Đ" },
      NguVan: { score: 7.7, evaluation: "Đ" },
      NgoaiNgu: { score: 6.3, evaluation: "Đ" },
      VatLy: { score: 3.7, evaluation: "KĐ" },
      HoaHoc: { score: 6.8, evaluation: "Đ" },
      SinhHoc: { score: 6.3, evaluation: "Đ" },
      LichSu: { score: 3.5, evaluation: "KĐ" },
      DiaLy: { score: 7.9, evaluation: "Đ" },
      GDCD: { score: 9.6, evaluation: "Đ" },
    },
  },
  {
    name: "Hoang",
    scores: {
      Toan: { score: 5.5, evaluation: "Đ" },
      NguVan: { score: 7.3, evaluation: "Đ" },
      NgoaiNgu: { score: 7.0, evaluation: "Đ" },
      VatLy: { score: 5.8, evaluation: "Đ" },
      HoaHoc: { score: 7.5, evaluation: "Đ" },
      SinhHoc: { score: 5.2, evaluation: "Đ" },
      LichSu: { score: 7.6, evaluation: "Đ" },
      DiaLy: { score: 3.8, evaluation: "KĐ" },
      GDCD: { score: 9.9, evaluation: "Đ" },
    },
  },
  {
    name: "Khanh",
    scores: {
      Toan: { score: 7.0, evaluation: "Đ" },
      NguVan: { score: 3.7, evaluation: "KĐ" },
      NgoaiNgu: { score: 10.0, evaluation: "Đ" },
      VatLy: { score: 7.7, evaluation: "Đ" },
      HoaHoc: { score: 9.0, evaluation: "Đ" },
      SinhHoc: { score: 4.6, evaluation: "KĐ" },
      LichSu: { score: 6.4, evaluation: "Đ" },
      DiaLy: { score: 6.6, evaluation: "Đ" },
      GDCD: { score: 5.9, evaluation: "Đ" },
    },
  },
];

const top3School = students.map((student) => {
    let totalScore = 0;
    const subjects = Object.values(student.scores);

    for (let i = 0; i < subjects.length; i++) {
        totalScore += subjects[i].score;
    }
    
    return {
        name: student.name,
        average: totalScore / subjects.length,
    };
})
.sort((a, b) => b.average - a.average)
.slice(0, 3);

console.log("3 hoc sinh co so diem cao nhat la:",top3School);

const lowStudent = students.map((student) => {
    let totalScore = 0;
    const subjects = Object.values(student.scores);

    for (let i = 0; i < subjects.length; i++) {
        totalScore += subjects[i].score;
    }
    
    return {
        name: student.name,
        average: totalScore / subjects.length,
    };

})
    .sort((a, b) => b.average - a.average)
    .slice(9, 10);
console.log("Hoc sinh co so diem thap nhat la", lowStudent);

const diemTrungbinh = students.map((student) => {
    let totalScore = 0;
    const subjects = Object.values(student.scores); 
    
    for (let i = 0; i < subjects.length; i++) {
        totalScore += subjects[i].score;
    }
    return {
        name: student.name,
        average: totalScore / subjects.length,
    };
})
    .sort((a, b) => a.average - b.average)
    .slice(0, 10);
console.log("Diem trung binh cua tat ca hoc sinh la:", diemTrungbinh);

const xepLoai = students.map((student) => {
    let totalScore = 0;
    let subjectCount = 0;
    const subjects = Object.values(student.scores);
    
    for (const subject in student.scores) {
        totalScore += student.scores[subject].score;
        subjectCount += 1;
    };
    const average = totalScore / subjectCount;

    let evaluation;
    if (student >= 8) {
        evaluation = "Hoc sinh gioi";
    }
    else if (student >= 6.5 <= 7.8) {
        evaluation = "Hoc sinh kha";
    }
    else {
        evaluation = "Hoc sinh can co gang hon";
    }
    return { name: student.name, evaluation }
});
console.log("Danh sach hoc sinh theo danh hieu hoc luc:", xepLoai)