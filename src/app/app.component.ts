import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { read, utils } from 'xlsx';

interface President { Name: string; Index: number };

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

  async onFileChange(event: any): Promise<void> {
    const file = event.target.files[0];
    if (file) {
      // Read the file as ArrayBuffer
      
      const ab = await file.arrayBuffer();

      // Create a new workbook

      const wb = read(ab, { type: 'array' });

      // Get the first worksheet

      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      // Convert the worksheet to an array of JSON objects

      const data: any[][] = utils.sheet_to_json(ws, { header: 1 });

      // Update the rows

      this.rows = data.map((r, i) => ({ Name: r[0], Index: i }));
    }
  }
}
