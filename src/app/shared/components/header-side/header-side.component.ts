import { Component, OnInit, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { LayoutService } from '../../services/layout.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthorizeService } from "../../services/MyServices/authorize.service";
import { AppConfirmService } from '../../../shared/services/app-confirm/app-confirm.service';
import { CommonService } from "../../services/MyServices/common.service";
@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.template.html'
})
export class HeaderSideComponent implements OnInit {
  @Input() notificPanel;
  public UserCode: any;
  public RoleName: any;
  public availableLangs = [{
    name: 'EN',
    code: 'en',
    flag: 'flag-icon-us'
  }, {
    name: 'ES',
    code: 'es',
    flag: 'flag-icon-es'
  }]
  currentLang = this.availableLangs[0];
  title = 'Confirmation ';
  text = 'Are you sure want to Sign out??';

  selectedOption ;

  public egretThemes;
  public layoutConf: any;
  constructor(
    private themeService: ThemeService,
    private layout: LayoutService,
    public translate: TranslateService,
    private renderer: Renderer2,
    private CommonService: CommonService,
    private Auth: AuthorizeService,
    public confirmService: AppConfirmService,
  ) { }
  ngOnInit() {
    this.egretThemes = this.themeService.egretThemes;
    this.layoutConf = this.layout.layoutConf;
    this.translate.use(this.currentLang.code);
    this.UserCode = this.CommonService.getUserCode();
    this.RoleName = this.CommonService.getRole();
  }
  setLang(lng) {
    this.currentLang = lng;
    this.translate.use(lng.code);
  }
  changeTheme(theme) {
    // this.themeService.changeTheme(theme);
  }
  toggleNotific() {
    this.notificPanel.toggle();
  }
  toggleSidenav() {
    if (this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      })
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    })
  }

  toggleCollapse() {
    // compact --> full
    if (this.layoutConf.sidebarStyle === 'compact') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full',
        sidebarCompactToggle: false
      }, { transitionClass: true })
    }

    // * --> compact
    this.layout.publishLayoutChange({
      sidebarStyle: 'compact',
      sidebarCompactToggle: true
    }, { transitionClass: true })

  }
  logout() {

    
    this.confirmService.LogOutOCnform({title: this.title, message: this.text})
      .subscribe((result) => {
        this.selectedOption = result;

        if(this.selectedOption==true)
        {
          this.Auth.loggedOut();
        }
        
       
      });

  }

  onSearch(e) {
    //   console.log(e)
  }
}