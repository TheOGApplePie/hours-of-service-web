import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateTime } from 'luxon';
import { DailyViewService } from 'src/app/services/daily-view.service';

@Component({
  selector: 'app-daily-view',
  templateUrl: './daily-view.component.html',
  styleUrls: ['./daily-view.component.scss'],
})
export class DailyViewComponent implements OnInit, AfterViewInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private dailyViewService: DailyViewService
  ) {}
  @ViewChild('dailyViewCanvas', { static: true })
  dailyViewCanvas!: ElementRef<HTMLCanvasElement>;
  currentDay: string = '';
  dailyLog!: FormGroup;
  ctx!: CanvasRenderingContext2D;
  currentDayNgb: NgbDateStruct = {
    year: 0,
    month: 0,
    day: 0,
  };

  ngOnInit(): void {
    this.initDailyLogForm();
    this.getDayFromUrl();
  }
  ngAfterViewInit(): void {
    this.ctx = this.dailyViewCanvas.nativeElement.getContext('2d')!;
    this.dailyViewCanvas.nativeElement.setAttribute(
      'width',
      (window.innerWidth - 100).toString()
    );
    this.dailyViewCanvas.nativeElement.setAttribute('height', '300');
    this.drawAxis();
    // this.dailyViewCanvas.nativeElement.addEventListener('click', (click) => {
    //   this.drawDot(click.x - 48, click.y - 128);
    // });
  }
  drawAxis() {
    var x = (window.innerWidth - 100) / 24;
    var y = 100;
    this.ctx.fillStyle = 'black';
    for (let i = 0; i < 24; i++) {
      this.ctx.font = 'bold 16px sans-serif';
      this.ctx.fillText(`${i}:00`, x * i, 20);
      this.drawLine(x * i, 0, x * i, 300, 2);
    }
    for (let i = 0; i < 3; i++) {
      this.drawLine(0, y * i, window.innerWidth, y * i);
    }
    for (let i = 0; i < 96; i++) {
      this.drawLine((x / 4) * i, 0, (x / 4) * i, 300, 0.25);
    }
    this.ctx.setLineDash([]);
  }
  drawDot(x: number, y: number) {
    this.ctx.fillStyle = 'blue';
    this.ctx.beginPath();
    this.ctx.arc(x, y, 5, 0, Math.PI * 2);
    this.ctx.fill();
  }
  get events() {
    return this.dailyLog.get('events') as FormArray;
  }
  getDayFromUrl() {
    this.activatedRoute.paramMap.pipe().subscribe({
      next: (value) => {
        this.currentDay = value.get('day')!;
        const temp = DateTime.fromISO(this.currentDay);
        this.currentDayNgb = {
          year: temp.year,
          month: temp.month,
          day: temp.day,
        };
      },
    });
  }
  initDailyLogForm() {
    this.dailyLog = new FormGroup({
      events: new FormArray([]),
    });
    this.listenToEvents();
    this.dailyViewService.getDailyView();
  }

  listenToEvents() {
    this.events.valueChanges.pipe().subscribe({
      next: (value) => {
        this.ctx.clearRect(
          0,
          0,
          this.dailyViewCanvas.nativeElement.width,
          this.dailyViewCanvas.nativeElement.height
        );
        this.drawAxis();
        this.drawEvents();
      },
    });
  }
  drawEvents() {
    const x = (window.innerWidth - 100) / 24;
    this.events.controls.forEach((event, index) => {
      const time = event.get('time')?.value;
      const type = event.get('type')?.value;
      const calculatedX = time.hour * x + (time.minute / 60) * x;
      const calculatedY =
        type === 'off' ? 50 : type === 'on-driving' ? 150 : 250;
      if (index >= 1) {
        const priorTime = this.events.at(index - 1).get('time')?.value;
        const priorType = this.events.at(index - 1).get('type')?.value;
        const priorX = priorTime.hour * x + (priorTime.minute / 60) * x;
        const priorY =
          priorType === 'off' ? 50 : priorType === 'on-driving' ? 150 : 250;
        this.drawLine(priorX, priorY, calculatedX, priorY, 3, 'red');
        this.drawLine(calculatedX, priorY, calculatedX, calculatedY, 3, 'red');
        if (this.events.controls.length - index <= 1) {
          this.drawLine(
            calculatedX,
            calculatedY,
            window.innerWidth - 100,
            calculatedY,
            3,
            'red'
          );
          if (priorType !== 'off') {
            this.drawLine(
              window.innerWidth - 100,
              calculatedY,
              window.innerWidth - 100,
              50,
              3,
              'red'
            );
          }
        }
      } else {
        this.drawLine(0, 50, calculatedX, 50, 3, 'red');
        this.drawLine(calculatedX, 50, calculatedX, calculatedY, 3, 'red');
      }
    });

    this.events.controls.forEach((event) => {
      const time = event.get('time')?.value;
      const type = event.get('type')?.value;
      const calculatedX = time.hour * x + (time.minute / 60) * x;
      const calculatedY =
        type === 'off' ? 50 : type === 'on-driving' ? 150 : 250;
      this.drawDot(calculatedX, calculatedY);
    });
  }
  drawLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    lineWidth = 1,
    strokeStyle = 'black'
  ) {
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }
  addEvent() {
    let type = 'off';
    const timestamp = this.normalizeTime(DateTime.now());

    if (this.events.length < 1) {
      type = 'on-not-driving';
    }
    const event = new FormGroup({
      type: new FormControl(type),
      date: new FormControl({
        year: timestamp.year,
        month: timestamp.month,
        day: timestamp.day,
      }),
      time: new FormControl({ hour: timestamp.hour, minute: timestamp.minute }),
    });
    this.events.push(event);
  }
  normalizeTime(dateTime: DateTime) {
    if (dateTime.minute > 0 && dateTime.minute <= 7) {
      dateTime = dateTime.set({ minute: 0 });
    } else if (dateTime.minute > 7 && dateTime.minute <= 22) {
      dateTime = dateTime.set({ minute: 15 });
    } else if (dateTime.minute > 22 && dateTime.minute <= 37) {
      dateTime = dateTime.set({ minute: 30 });
    } else if (dateTime.minute > 37 && dateTime.minute <= 52) {
      dateTime = dateTime.set({ minute: 45 });
    } else {
      dateTime = dateTime.plus({ hours: 1 }).set({ minute: 0 });
    }

    return dateTime;
  }
  isDisabled(index: number, type: string) {
    if (index === 0) {
      return type === 'off';
    } else {
      return type === this.events.at(index - 1).get('type')?.value;
    }
  }
  saveCurrentDay() {}
}
