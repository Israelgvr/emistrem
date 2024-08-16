import { NgModule } from "@angular/core";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { MobilemenuComponent } from "./header/mobilemenu/mobilemenu.component";
import { SublevelMenuComponent } from "./header/mobilemenu/sub-level.menu.component";
import { CartitemComponent } from "./header/cartitem/cartitem.component";
import { MainmenuComponent } from "./header/mainmenu/mainmenu.component";
import { LayoutComponent } from "./layout.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { SwiperModule } from "swiper/angular";

@NgModule({
    declarations : [
        LayoutComponent,
        
        // Header
        HeaderComponent,
        MobilemenuComponent,
        SublevelMenuComponent,
        CartitemComponent,
        MainmenuComponent,

        // Footer
        FooterComponent
    ],
    imports : [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatRippleModule,
        MatSlideToggleModule,
        MatTooltipModule,
        MatExpansionModule,
        MatToolbarModule,
        MatTabsModule,
        HttpClientModule,
        SwiperModule
    ],
    exports: [
        LayoutComponent
    ]
})
export class LayoutModule {}