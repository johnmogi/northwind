const mysql = require("mysql");

// MySQL יצירת הגדרות התחברות למסד הנתונים
const connection = mysql.createConnection({
    host: "localhost", // מחשב
    user: "root", // היוזר של מסד הנתונים
    password: "", // הסיסמה של מסד הנתונים
    database: "northwind" // שם מסד הנתונים
});

// ביצוע התחברות
connection.connect(err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("We're connected to Northwind on MySQL.");
});

// SQL הוצאה לפועל של שאילתת
function executeAsync(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

module.exports = {
    executeAsync
};