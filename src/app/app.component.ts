import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { read, utils } from 'xlsx';

interface President {
  Item: string;
  Index: number;
  StartDate: string;
  EndDate: string;
  Cost: number;
  Disallowable: number;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-angular-app';
  rows: President[] = [];
  sheets: any[] = [];

  async onFileChange(event: any): Promise<void> {
    const file = event.target.files[0];
    if (file) {
      // Read the file as ArrayBuffer

      const ab = await file.arrayBuffer();

      // Create a new workbook

      const wb = read(ab, { type: 'array' });

      // Get all the sheet names

      this.sheets = wb.SheetNames;

      // Get the first worksheet

      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      // Convert the worksheet to an array of JSON objects

      const data: any[][] = utils.sheet_to_json(ws, { header: 1 });

      // Update the rows for each sheet

      this.rows = data.slice(1).map((r, i) => (
        {
          Item: r[0],
          Index: i,
          StartDate: r[1],
          EndDate: r[2],
          Cost: r[3],
          Disallowable: r[4]}
      ));
    }
  }
}
