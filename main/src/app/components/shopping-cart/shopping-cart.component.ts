import { Component } from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {SnackbarService} from "../../services/snackbar.service";
import {MainAPIService} from "../../services/main-api.service";
import {catchError, finalize, map, throwError} from "rxjs";


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  cart: any[] = [];
  valorFrete: number = 9.90;
  errorMessage: string | null = null;

  constructor(private mainAPI: MainAPIService,private shoppingCartService: ShoppingCartService, private snackbarService: SnackbarService) {
    this.loadCart();
    if (this.cart.length === 0) {
      this.errorMessage = 'O carrinho está vazio.';
    }

  }


  calculateTotal(): number {
    const frete = Number(this.valorFrete);  // Certifique-se de que valorFrete é um número
    const totalProdutos = this.cart.reduce((total, product) => {
      const precoProduto = Number(product.product_price);  // Certifique-se de que product_price é um número
      return total + precoProduto;
    }, 0);
  
    return frete + totalProdutos;
  }


  loadCart(): void {
    this.cart = this.shoppingCartService.getCart();
    console.log("Carrinho foi Carregado...")
    if (this.cart.length === 0) {
      this.errorMessage = 'O carrinho está vazio.';
    }
  }

  removeFromCart(product: string): void {
    const audio = new Audio('assets/remove_cart_item.mp3');
    audio.play(); 

    this.shoppingCartService.removeFromCart(product);
    //this.snackbarService.show('Item removido do carrinho!');
    this.loadCart();
  }


  isLoading: boolean = false;
  status: any = "";
  checkout() {
   this.isLoading = true;
    this.mainAPI.pagBank(this.cart).pipe(
      map(response => {
         window.location.href = response
         console.log(response)
         this.isLoading = false;
         this.status = "sucesso";
      }),
      catchError(err => {
        this.isLoading = false;
        this.status = "falha";
        console.error('Erro ao enviar dados para PagBank', err);
        return throwError(() => new Error('Erro ao enviar dados para PagBank. Por favor, tente novamente mais tarde.'));
      }),
      finalize(() => { this.isLoading = false})
    ).subscribe()
  }


}
