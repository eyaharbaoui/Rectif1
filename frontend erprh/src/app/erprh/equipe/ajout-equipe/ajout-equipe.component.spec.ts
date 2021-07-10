import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutEquipeComponent } from './ajout-equipe.component';

describe('AjoutEquipeComponent', () => {
  let component: AjoutEquipeComponent;
  let fixture: ComponentFixture<AjoutEquipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutEquipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
