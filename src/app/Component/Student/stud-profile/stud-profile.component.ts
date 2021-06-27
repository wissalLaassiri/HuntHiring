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
  educations: any;
  experience: any;
  skills: any;
  projects:any;
  certif:any;
  closeModal: string;
  url: string;
  currentEducation:any;
  currentProject :any;

  @Input() project = {
    id: '',
    title:'',
    description:'',
    link:''
  };
  @Input() education = {
    id:'',
    title:'',
    education_level:0,
    school:'',
    startDate:'',
    endDate:'',
    city:''
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
        this.educations = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //========================= Get education ById ===============
  onGetEducationById(id:any) {
    this.authService.getEducationById(id).subscribe(
      (data) => {
        this.currentEducation = data;
        console.log("current edu ",this.currentEducation);
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
    //========================= Get Projects ById ===============
    onGetProjectsById(id:any) {
      this.authService.getProjectById(id).subscribe(
        (data) => {
          this.currentProject = data;
          console.log('curent project', this.currentProject);
        },
        (error) => {
          console.log(error);
        }
      );
    }

  //========================= Edit Education ====================
  onEditEducation(id:any){
    this.authService.editEducation(id,this.education).subscribe(
      (response) => {
        console.log('doonee edit', response);
        this.refresh();
      },
      (error) => {
        console.log(error);
      }
    );
  }  //========================= Edit Education ====================
  onEditProject(id:any){
    this.authService.editProject(id,this.project).subscribe(
      (response) => {
        console.log('doonee edit', response);
        this.refresh();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //============ refresh page ==============
  refresh(): void {
    window.location.reload();
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
