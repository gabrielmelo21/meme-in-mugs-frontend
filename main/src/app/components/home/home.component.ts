import {Component} from '@angular/core';
import {MainAPIService} from "../../services/main-api.service";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {SnackbarService} from "../../services/snackbar.service";




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
 
  products: any[] = [];

  public isLoading = false;
  categorySelected: boolean = false;

  categories = [
    { name: 'Canecas com IA', imageUrl: 'assets/capa_ia.jpg', tag: 'IA' },
    { name: 'Canecas Aleatórias', imageUrl: 'assets/capa_random.png', tag: 'Random' },
    { name: 'Canecas com Animais', imageUrl: 'assets/capa_animais.jpg', tag: 'Animais'},
    { name: 'Canecas com Macacos', imageUrl: 'assets/capa_macacos.png', tag: 'Macacos'},  
    { name: 'Canecas com Gatos', imageUrl: 'assets/capa_gatos.png', tag: 'Gatos' },
    { name: 'Canecas com Cachorros', imageUrl: 'assets/capa_cachorro.jpg', tag: 'Cachorros' }
  ];
 
 
  playSound(): void {
    //const audio = new Audio('assets/fart.mp3');
    const audio = new Audio('assets/swipe.mp3');
    audio.play(); 
  }

 


  constructor(private mainAPI: MainAPIService, private shoppingCartService: ShoppingCartService, private snackbarService: SnackbarService) {
   
  
  /** 
   * 
   *  setTimeout(() => {
      this.loadProducts();
    }, 2000);

   * 
   * **/
   
  }

  


  addToCart(product: any): void {
    const audio = new Audio('assets/fart.mp3');
    audio.play(); 
    this.shoppingCartService.addToCart(product);
    this.snackbarService.show('Item adicionado ao carrinho!');
    this.showCart();
  }
  showCart(): void {
    const cart = this.shoppingCartService.getCart();
    console.log(cart);
  }
  clearCart(): void {
    this.shoppingCartService.clearCart();
  }
 
 


  category_selected: string = ""; 
  select_category(category: string): void {

    this.playSound();

    // Criar o objeto com a categoria
    const requestObject = { category: category };

    // categoria esta ativa
    this.categorySelected = true;


    const selectedCategory = this.categories.find(cat => cat.tag === category);

    if (selectedCategory) {
      this.category_selected = selectedCategory.name; // Armazena o name da categoria correspondente
    }

    // Chamar a API passando o objeto
    this.isLoading = true;
    this.mainAPI.listProdutos(requestObject).subscribe(
      (data) => {
        this.products = data;
        this.isLoading = false;
        console.log("Products were loaded." + JSON.stringify(data));
      },
      (error) => {
        console.error('Error fetching products', error);
        this.isLoading = false;
        console.log("Error loading products in home.");
      }
    );
  }




  currentImage:any = "/assets/logo-bonk-1.png";
 
  bonk(){
     this.currentImage = "/assets/logo-bonk-2.png"; 
    const audio = new Audio('assets/bonk.mp3');
    audio.play(); 

  // Após 2 segundos, restaurar a imagem original
  setTimeout(() => this.resetImage(), 500);
  }

  resetImage(): void {
     this.currentImage = "/assets/logo-bonk-1.png"; 
  }
 back_to_category(){
   const audio = new Audio('assets/swipe.mp3');
   audio.play(); 
   this.categorySelected = false; 
 }


  /**
  public listWords$: Observable<any> | undefined;
  public isLoading = false;




  emptyList: boolean = false;
  public listWords(){
    this.isLoading = true;
    this.listWords$ = this.mainAPI.listAllWords(localStorage.getItem("UserId")+"").pipe(
      map(resp => {
         if(resp.length === 0){
           this.emptyList = true;
         }else{
            this.emptyList = false;
         }
        return resp.reverse();
      }),
      finalize(() => this.isLoading = false)

    );
  }


  delete_smartcard(id: number) {
     this.mainAPI.deleteSmartcard(id).pipe(
       map(resp => {
          alert(JSON.stringify(resp))
         this.listWords();
       })
     ).subscribe();
  }

    **/


}

