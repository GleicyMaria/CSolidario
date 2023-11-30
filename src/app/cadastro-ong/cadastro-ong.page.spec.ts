import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroOngPage } from './cadastro-ong.page';

describe('CadastroOngPage', () => {
  let component: CadastroOngPage;
  let fixture: ComponentFixture<CadastroOngPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CadastroOngPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
