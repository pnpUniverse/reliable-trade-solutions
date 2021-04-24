import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-stat',
    templateUrl: './stat.component.html',
    styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
    @Input() bgClass: string;
    @Input() icon: string;
    @Input() count: number;
    @Input() label: string;
    @Input() route: string;
    @Input() data: number;

    constructor(
        private router: Router
    ) {}

    ngOnInit() {}

    onAnchorClick () {
        this.router.navigate([`/${this.route}`]);
    }
}
