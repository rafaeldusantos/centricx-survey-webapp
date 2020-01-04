import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MainComponent } from './main.component';
import { SurveyComponent } from './survey/survey.component'
import { ReasonComponent } from './reason/reason.component';
import { ThanksComponent } from './thanks/thanks.component';
import { JustifyComponent } from './justify/justify.component';
import { AnsweredComponent } from './answered/answered.component'

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  }
];

@NgModule({
  declarations: [
    MainComponent,
    SurveyComponent,
    ReasonComponent,
    ThanksComponent,
    JustifyComponent,
    AnsweredComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class MainModule { }
