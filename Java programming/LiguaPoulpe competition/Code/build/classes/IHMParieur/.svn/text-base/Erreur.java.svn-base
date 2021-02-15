
package IHMParieur;




import java.awt.BorderLayout;
import java.awt.Color;

import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JLayeredPane;

/**
 * Ecran qui s'affiche si un joueur veut créer un compte coach alors qu'il y a déjà 16 coachs.
 */

public class Erreur extends JFrame
{
	JLayeredPane layer0 ;
	Bouton ok;
        LabelOutils titre, titre2 ;

        JLabel background;



       	public static final String pathImage =  "C:/tmp/poulpe/Ligua Poulpe/src/images/" ;

	public Erreur()
	{
		addWindowListener(new WindowAdapter()
                {
                @Override
			public void windowClosing(WindowEvent e) {
				System.out.println("bye");
				dispose();
				System.exit(0);
			}
		});

                //Définit le titre de la fenêtre.
                this.setTitle("Erreur : les inscription pour participer au championnat sont closes");
                //Définit la taille de la fenêtre.
                this.setSize(600, 200);
                //Positionne la fenêtre au centre de l'écran.
                this.setLocationRelativeTo(null);
                //Empêche le redimensionnement de la fenêtre.
                this.setResizable(false);
	}

/**
  * On construit le fond d'écran avec les composants (boutons et titres)
  */
	public void addBackgroundError()
	{
                
		layer0 = new JLayeredPane();

		// Pour le fond d'écran
		background = new JLabel ();
		background.setBounds (0,0,600,200) ;
		background.setOpaque(true);
                background.setBackground(Color.blue);
                layer0.add (background, new Integer (0));
		getContentPane().add(layer0, BorderLayout.CENTER);

                // Pour le titre
                titre = new LabelOutils(40,20,580,50);
                titre.addMessage("Les inscriptions pour participer au championnat sont closes", "Arial", 20, Color.yellow);

                titre2 = new LabelOutils(100,70,400,50);
                titre2.addMessage("Vous pouvez cependant miser sur les Equipes déjà formées", "Arial", 15, Color.black);

		// Pour le bouton
                ok = new Bouton (260,120,80,30);
                ok.setText("OK");
                ok.addMouseListener(new java.awt.event.MouseAdapter()
                {
                @Override
                     public void mouseClicked(java.awt.event.MouseEvent evt)
                     {
                            System.out.println("ok");
                            setVisible(false);
                     }
                 });

                
		// On ajoute les composants
		layer0.add (titre,new Integer (1));
                layer0.add (titre2,new Integer (1));
		layer0.add (ok,new Integer (1));
                
	}




       
}
	


