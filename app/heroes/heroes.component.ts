import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { Hero } from './hero.model';
import { HeroesService } from './heroes.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes:Hero[]
  private closeSub: Subscription;
  constructor(
    private heroesService:HeroesService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }
  ngOnInit(): void {
    this.heroesService.errorChange.subscribe((errorMsg)=>{
      this.showErrorAlert(errorMsg);
    })
  }
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
      this.heroesService.clearError();
    });
  }
}
