import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListOngsPage } from './list-ongs.page';

describe('ListOngsPage', () => {
  let component: ListOngsPage;
  let fixture: ComponentFixture<ListOngsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListOngsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
