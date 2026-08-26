import * as path from 'path';
import * as XLSX from 'xlsx';

export class ExcelReader {
    static read<T>(sheetName: string, fileName: string = 'SauceDemoTestData.xlsx'): T[] {
        let filePath = path.join(process.cwd(), 'testdata', fileName);
        let workbook = XLSX.readFile(filePath);
        let worksheet = workbook.Sheets[sheetName];
        if (!worksheet) {
            throw new Error(`sheet "${sheetName}" is not found in the the file "${fileName}"`);
        }
        return XLSX.utils.sheet_to_json<T>(worksheet, { defval: '' });
    }


    static getRowByTestCaseId<T>(sheetName: string, testCaseId: string, fileName: string = 'SauceDemoTestData.xlsx'): T | undefined {

        let rows = this.read<T>(sheetName, fileName);
        return rows.find((row: any) => {
            return String(row.TestCaseID ?? '').trim() === testCaseId
        })
    }

    static getCellValue(sheetName: string, testCaseId: string, columnName: string, fileName: string = 'SauceDemoTestData.xlsx'): string {
        let row: any = this.getRowByTestCaseId(sheetName, testCaseId, fileName);
        return String(row?.[columnName] ?? '').trim();


    }
}