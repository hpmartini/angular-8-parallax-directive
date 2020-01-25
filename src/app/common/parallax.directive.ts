import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective {
  @Input('ratio') set parallaxRatio(val) {
    this.ratio = val ? val : 1;
  }

  private ratio: number;
  initialTop = 0;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.initialTop = this.elementRef.nativeElement.getBoundingClientRect().top;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.renderer.setProperty(this.elementRef.nativeElement, 'style',
      `transform: translateY(${(this.getTranslation())}px)`);
  }

  private getTranslation() {
    return this.initialTop - (window.scrollY * this.ratio / 10);
  }
}