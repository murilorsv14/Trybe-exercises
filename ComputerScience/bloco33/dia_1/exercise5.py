# Exercício 5: Considere que a cobertura da tinta é de 1 litro para cada 3
# metros quadrados e que a tinta é vendida em latas de 18 litros, que custam
# R$ 80,00. Crie uma função que retorne dois valores em uma tupla contendo a
# quantidade de latas de tinta a serem compradas e o preço total a partir do
# tamanho de uma parede(em m²).

def custoParaPintarNMetrosQuadrados(n):
    preco = 0
    quantidade = 0
    while n > 18 * 3:
        preco += 80
        quantidade += 1
        n -= 18 * 3
    preco += 80
    quantidade += 1
    return (preco, quantidade)


print(custoParaPintarNMetrosQuadrados(200))
