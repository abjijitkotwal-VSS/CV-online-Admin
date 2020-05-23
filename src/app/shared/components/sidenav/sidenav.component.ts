import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.template.html'
})
export class SidenavComponent {

  public PageDetails = [];
  InventoryImages = [];
  public ServiceFinalData: any[];
  public ServicemenuItems: any[]
  FinaldataData = [];
  @Input('items') public menuItems: any[] = [];
  @Input('hasIconMenu') public hasIconTypeMenuItem: boolean;
  @Input('iconMenuTitle') public iconTypeMenuTitle: string;

  constructor() { }
  ngOnInit() {

    debugger;

    var list = JSON.parse(localStorage.getItem('PageDetails'))

    console.log(list);
    //alert('hi');

    list.forEach(function (x) { delete x.is_active });
    list.forEach(function (x) { delete x.role_id });

    debugger;
    this.ServicemenuItems = list;
    // console.log('Go for test');
    debugger;
    // console.log(this.ServicemenuItems);

    for (let entry of this.ServicemenuItems) {

      // console.log(entry.page.page_master_detail);

      if (entry.page_detail.length > 0) {
        this.InventoryImages = [];
        // for (let entryDetail of entry.page.page_master_detail) {

        //   this.InventoryImages.push(this.formDetailData(entryDetail.page_display_name, entryDetail.page_url));
        // }

        for (let entryDetail of entry.page_detail) {

            this.InventoryImages.push(this.formDetailData(entryDetail.page_display_name, entryDetail.page_url));
          }
      }


      //console.log(this.InventoryImages);

      // this.FinaldataData.push(this.formData(entry.page.page_display_name
      //   , entry.page.type,
      //   entry.page.tooltip,
      //   entry.page.icon,
      //   entry.page.page_url,
      //   this.InventoryImages
      // ));


      this.FinaldataData.push(this.formData(entry.page_display_name
        , entry.type,
        entry.tooltip,
        entry.icon,
        entry.page_url,
        this.InventoryImages
      ));

      // else{
      //   this.FinaldataData.push(this.formDataMaster(entry.page.page_display_name
      //     , entry.page.type,
      //     entry.page.tooltip,
      //     entry.page.icon,
      //     entry.page.page_url
      //   ));

      //}

      this.InventoryImages = [];

      // console.log('this.FinaldataData');
      // console.log(this.FinaldataData);
    }

    this.addServiceMenu();


  }

  formDataMaster(name, type, tooltip, icon, state): Page {
    const PageData: Page = {} as Page;
    PageData.icon = icon
    PageData.name = name;
    PageData.state = state;

    PageData.tooltip = tooltip;
    PageData.type = type;
    return PageData;
  }

  formData(name, type, tooltip, icon, state, sub: any): Page {
    const PageData: Page = {} as Page;
    PageData.icon = icon
    PageData.name = name;
    PageData.state = state;
    PageData.sub = sub;
    PageData.tooltip = tooltip;
    PageData.type = type;
    return PageData;
  }
  formDetailData(name, state): sub {
    const subData: sub = {} as sub;
    subData.name = name;
    subData.state = state;
    return subData;
  }

  addServiceMenu() {
    // console.log('this.menuItems');
    // console.log(this.menuItems);
    //this.menuItems=[];
    // this.menuItems.push(this.FinaldataData[0]);
    this.menuItems = this.FinaldataData;
    //  console.log(this.menuItems);
    // console.log(this.FinaldataData);
  }

  // Only for demo purpose
  addMenuItem() {
    this.menuItems.push({
      name: 'ITEM',
      type: 'dropDown',
      tooltip: 'Item',
      icon: 'done',
      state: 'material',
      sub: [
        { name: 'SUBITEM', state: 'cards' },
        { name: 'SUBITEM', state: 'buttons' }
      ]
    }, {
      name: 'ITEM',
      type: 'dropDown',
      tooltip: 'Item',
      icon: 'done',
      state: 'material',
      sub: [
        { name: 'SUBITEM', state: 'cards' },
        { name: 'SUBITEM', state: 'buttons' }
      ]
    });
  }
}


export class Page {

  name: string;
  type: string;
  tooltip: string;
  icon: string;
  state: string;
  sub: sub[];
  pageNumber: number;
  size: number;
  totalElements: number;

}


export class sub {
  name: string;
  state: string;
}