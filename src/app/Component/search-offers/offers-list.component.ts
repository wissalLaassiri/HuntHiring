import { ChangeDetectorRef, Input, OnChanges, SimpleChanges } from "@angular/core";
import { threadId } from "node:worker_threads";
import { SearchOffersService } from "./search-offers.service";

export class OffersListComponent implements OnChanges{
    @Input() groupFilters : Object;
    @Input() searchByKeyWord: string;
    offers: any[] = [];
    filteredOffers: any[] = [];
    constructor(private searchOffersService : SearchOffersService, private ref: ChangeDetectorRef){}
    
    ngOnInit() : void{
        this.loadResults();
    }
    
    
    
    
    ngOnChanges(): void {
        if (this.groupFilters) this.filterOffers(this.groupFilters, this.offers);
    }
    filterOffers(filters: any, offers: any): void{
        this.filteredOffers = this.offers;
        const keys = Object.keys(filters);
		const filterOffers = offer => {
			let result = keys.map(key => {
				if (!~key.indexOf('filter')) {
					if(offer[key]) {
						return String(offer[key]).toLowerCase().startsWith(String(filters[key]).toLowerCase())
					} else {
						return false;
					}
				}
			});

            result = result.filter(it => it !== undefined);
			if (filters['types'] && filters['fields']) {
				if (offer['age']) {
					if (+offer['filter'] >= +filters['types'] && +offer['filter'] <= +filters['fields']) {
						result.push(true);
					} else {
						result.push(false);
					}
					} else {
						result.push(false);
					}
				}
			return result.reduce((acc, cur: any) => { return acc & cur }, 1)
		}
		this.filteredOffers = this.offers.filter(filterOffers);
		}
    

    loadResults() : void{
        this.searchOffersService.searchEntries(this.searchByKeyWord)
        .subscribe(offers => this.offers = offers);
			this.filteredOffers = this.filteredOffers.length > 0 ? this.filteredOffers : this.offers;
    }
}

