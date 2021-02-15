
package IHMParieur;

import java.awt.Color;
import java.awt.Font;

import javax.swing.JLabel;


/**
 * Cette classe contient des méthodes permettant de gérer le graphisme des labels.
 */


public class LabelOutils extends JLabel
{

    private int x,y,l,L;


/**
  * Constructeur d'un LabelOutils avec en paramètre : son abscisse, son ordonnée, sa longueur et sa hauteur.
  */
    public LabelOutils(int abscisse, int ordonnee,int longueur, int largeur)
    {
        this.x = abscisse ;
        this.y = ordonnee ;
        this.l = longueur ;
        this.L = largeur ;

        this.setOpaque(true);
        this.setEnabled(true);
        this.setBounds(x,y,l,L);
    }




/**
 * Pour gérer la police d'écriture du label. En paramètre : message, nom de la Police, taille de la Police et la couleur
 */

    public void addMessage(String message,String NomPolice, int taillePolice, Color couleur)
    {
        Font police1 = new Font(NomPolice,Font.ROMAN_BASELINE,taillePolice);
        this.setFont(police1);
        this.setForeground(couleur);
        this.setText(message);
        this.setOpaque(false);

    }

}
