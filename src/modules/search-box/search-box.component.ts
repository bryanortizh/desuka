import { Component, OnInit } from '@angular/core';
import { IconsSVG } from 'src/core/enum/images-svg.enum';
import { CapacitorFunctionService } from 'src/services/capacitorFunction.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  standalone: false,
})
export class SearchBoxComponent implements OnInit {
  iconSVGCamera = IconsSVG.cameraSVG;

  recentSearches = [
    {
      title: 'Lofi Study 2024',
      subtitle: 'Playlist',
      img: 'assets/img/lofi.jpg',
    },
    {
      title: 'clear eyes, blind sight',
      subtitle: 'idyllla',
      img: 'assets/img/clear.jpg',
    },
    { title: 'Crush', subtitle: 'Laffey', img: 'assets/img/crush.jpg' },
    {
      title: 'The Prophecy',
      subtitle: 'Mondo Loops',
      img: 'assets/img/prophecy.jpg',
    },
    {
      title: 'Ventura',
      subtitle: 'Your Magnolia',
      img: 'assets/img/ventura.jpg',
    },
    { title: 'cool winds', subtitle: 'kudo', img: 'assets/img/winds.jpg' },
    { title: 'Cailin', subtitle: 'kokoro', img: 'assets/img/cailin.jpg' },
    {
      title: 'Orpheus',
      subtitle: 'Dimension 32',
      img: 'assets/img/orpheus.jpg',
    },
  ];

  constructor(public scannerAudio: CapacitorFunctionService) {}

  ngOnInit() {}
}
