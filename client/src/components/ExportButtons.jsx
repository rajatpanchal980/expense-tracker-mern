import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ExportButtons({ transactions }) {
    const exportPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Expense Tracker Report", 14, 20);

        const tableData = transactions.map((t) => [
            t.title,
            t.category,
            t.amount,
            new Date(t.date).toLocaleDateString("en-IN"),
        ]);

        autoTable(doc, {
            head: [["Title", "Category", "Amount", "Date"]],
            body: tableData,
            startY: 30,
            theme: "striped",
            headStyles: {
                fillColor: [37, 99, 235],
            },
        });

        doc.save("Expense_Report.pdf");
    };

    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            transactions.map((t) => ({
                Title: t.title,
                Category: t.category,
                Amount: t.amount,
                Date: new Date(t.date).toLocaleDateString("en-IN"),
            }))
        );

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const fileData = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });

        saveAs(fileData, "Expense_Report.xlsx");
    };

    return (
        <div className="flex flex-col sm:flex-row  gap-4 mt-6 mb-6">
            <button
                onClick={exportPDF}
                className="w-full sm:w-auto bg-gradient-to-r from-slate-700 to-blue-600 hover:from-slate-800 hover:to-blue-700 text-white px-5 py-3 rounded-xl shadow-lg transition duration-300"

            >
                📄 Export PDF
            </button>

            <button
                onClick={exportExcel}
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-5 py-3 rounded-xl shadow-lg transition duration-300"
            >
                📊 Export Excel
            </button>
        </div>
    );
}

export default ExportButtons;