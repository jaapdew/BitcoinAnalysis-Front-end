import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseHubComponent } from './database-hub.component';

describe('DatabaseHubComponent', () => {
  let component: DatabaseHubComponent;
  let fixture: ComponentFixture<DatabaseHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseHubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
