import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OngProfilePage } from './ong-profile.page';

describe('OngProfilePage', () => {
  let component: OngProfilePage;
  let fixture: ComponentFixture<OngProfilePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OngProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
