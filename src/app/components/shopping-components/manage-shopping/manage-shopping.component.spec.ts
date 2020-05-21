import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageShoppingComponent } from './manage-shopping.component';

describe('ManageShoppingComponent', () => {
  let component: ManageShoppingComponent;
  let fixture: ComponentFixture<ManageShoppingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageShoppingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
