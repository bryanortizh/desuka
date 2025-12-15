import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { IconsSVG } from 'src/core/enum/images-svg.enum';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements OnInit {
  searchv2SVG = IconsSVG.searchV2SVG;
  homeSVG = IconsSVG.homeSVG;
  accountSVG = IconsSVG.accountSVG;
  messageSVG = IconsSVG.messageSVG;
  constructor() {}

  ngOnInit() {}
}
