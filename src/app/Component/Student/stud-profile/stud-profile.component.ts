import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/Authentification/auth.service';
import { OfferService } from 'src/app/services/Offer/offer.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-stud-profile',
  templateUrl: './stud-profile.component.html',
  styleUrls: ['./stud-profile.component.scss'],
})
export class StudProfileComponent implements OnInit {
  user: any;
  education: any;
  experience: any;
  skills: any;
  projects:any;
  certif:any;
  closeModal: string;
  url: string;

  @Input() project = {
    id: '',
    title:'',
    description:'',
    link:''
  };
  constructor(
    private token: TokenStorageService,
    private modalService: NgbModal,
    private authService: AuthService,
    public offerServicce: OfferService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.token.getToken()) {
      this.onGetUser();
      this.onGetEducation();
      this.onGetExperience();
      this.onGetProjects();
      this.onGetCertifications();
    } else {
      this.router.navigate(['']);
    }
  }
  //======================= Get user information =================================
  onGetUser() {
    this.authService.getRole().subscribe(
      (data) => {
        this.user = data;
        // console.log('useerrr home ', this.user);
      },
      (error) => {
        console.log(error);
        this.router.navigate(['/login']);
      }
    );
  }
  //========================= Get education informations of user ===============
  onGetEducation() {
    this.authService.getEducation().subscribe(
      (data) => {
        this.education = data;
        // console.log('useerrr education ', this.education);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //========================= Get user's experience informations  ===============
  onGetExperience() {
    this.authService.getExperience().subscribe(
      (data) => {
        this.experience = data;
        this.onGetSkills();
        // console.log('useerrr experience ', this.experience);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //========================= Get user's projects   ===============
  onGetProjects() {
    this.authService.getProjects().subscribe(
      (data) => {
        this.projects = data;
        // console.log('useerrr projects ', this.projects);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //========================= Get user's certification   ===============
  onGetCertifications() {
    this.authService.getCertifications().subscribe(
      (data) => {
        this.certif = data;
        console.log('useerrr certif ', this.certif);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //========================= Get user's experience informations  ===============
  onGetSkills() {
    let skill=[];
    let ids= [];
    this.experience.forEach(s => {
      skill.push(s.skills);
      console.log("skiillsss of exepoooo ",s.skills);
      for(let s in skill){
        console.log("idd1 ",s);
      }
      // this.authService.getSkills(this.experience).subscribe(
      //   (data) => {
      //     this.skills = data;
      //     console.log('useerrr skills ', this.skills);
      //   },
      //   (error) => {
      //     console.log(error);
      //   }
      // );
    });

  }
  //============================= Add project ================
  onAddProject(){
    this.url = '/project/';
    this.authService.addProjects(this.project, this.url).subscribe(
      (response) => {
        this.projects.push(response);
        console.log('doonee project', response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showModal(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (res) => {
          this.closeModal = `Closed with: ${res}`;
        },
        (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
