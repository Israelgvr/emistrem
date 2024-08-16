import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRippleModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { CountdownModule } from "ngx-countdown";
import { SwiperModule } from "swiper/angular";
import { HeroComponent } from "./hero/hero.component";
import { CardsectionComponent } from "./cardsection/cardsection.component";
import { MessagesectionComponent } from "./messagesection/messagesection.component";
import { CategoriesComponent } from "./categories/categories.component";
import { AcademiccourseComponent } from "./academiccourse/academiccourse.component";
import { CampusSectionComponent } from "./campussection/campussection.component";
import { CountersectionComponent } from "./countersection/countersection.component";
import { HomeComponent } from "./home.component";
import { homeRoutes } from "./home.routing";

@NgModule({
    declarations : [
        HomeComponent,
        HeroComponent,
        CardsectionComponent,
        MessagesectionComponent,
        CategoriesComponent,
        AcademiccourseComponent,
        CampusSectionComponent,
        CountersectionComponent
    ],
    imports : [
        CommonModule,
        RouterModule.forChild(homeRoutes),
        MatCheckboxModule,
        MatDialogModule,
        MatSelectModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSlideToggleModule,
        MatTooltipModule,
        MatExpansionModule,
        MatToolbarModule,
        ReactiveFormsModule,
        FormsModule,
        MatTabsModule,
        CountdownModule,
        HttpClientModule,
        SwiperModule,
    ],
    exports : [

    ]
})
export class HomeModule {}