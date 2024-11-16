import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-angular-app';
  htmlContent: string = '';

  constructor() {
    // Load sample data when the component is initialized
    this.loadSampleData();
  }

  loadSampleData(): void {
    const csv = ``;

    // Parse CSV into a workbook object
    const wb = XLSX.read(csv, { type: 'string' });

    // Get the worksheet (default name "Sheet1")
    const ws = wb.Sheets['Sheet1'];

    // Create HTML table and set content
    this.htmlContent = XLSX.utils.sheet_to_html(ws, { id: 'tabeller' });
  }

  async onFileChange(event: any): Promise<void> {
    const file = event.target.files[0];
    if (file) {
      // Read the file as ArrayBuffer
      const data = await file.arrayBuffer();

      // Parse and load the first worksheet
      const wb = XLSX.read(data);
      const ws = wb.Sheets[wb.SheetNames[0]];

      // Generate HTML and update the view
      this.htmlContent = XLSX.utils.sheet_to_html(ws, { id: 'tabeller' });
    }
  }
}
