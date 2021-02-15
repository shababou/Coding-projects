package IHMParieur;




import DataJoueur.PlayerDataParieur;
import Reseaux.TCP_SERVER;
import liguapoulpe.Tournament;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Font;

import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JLayeredPane;
import javax.swing.JRadioButton;



/**
 * L'écran 7 fournit au parieur la liste des équipes en compétition
 * et lui offre la possibilité de voir plus précisemment les caractéristiques de chacune.
 */
public class Ecran7 extends JFrame
{
    // Communication avec le serveur
    private PlayerDataParieur dataP;
    private TCP_SERVER server;

    // Composants de la fenêtre
    public String pathImage ;

    private JLayeredPane layer0 ;
    private Bouton retour;
    private LabelOutils titre;
    private JLabel background;



 /**
  * Le constructeur (avec un PlayerDataPlayer en paramètre)
  */
    public Ecran7(PlayerDataParieur _dataP)
	{
                dataP = _dataP ;
                server = dataP.getServer();
                dataP.setT(server.getTournament());

                pathImage=dataP.getPathImage();

		addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent e) {
				System.out.println("bye");
				dispose();
				System.exit(0);
			}
		});


                
                //Définit le titre de la fenêtre.
                this.setTitle("Les équipes en compétition");
                //Définit la taille de la fenêtre.
                this.setSize(800, 600);
                //Positionne la fenêtre au centre de l'écran.
                this.setLocationRelativeTo(null);
                //Empêche le redimensionnement de la fenêtre.
                this.setResizable(false);
	}



/**
* On construit le fond d'écran avec les composants (boutons et titres)
*/
	void addBackground7()
	{
                layer0 = new JLayeredPane();

		//Pour le fond d'écran
		background = new JLabel (new ImageIcon (pathImage + "rouge.jpg"));
		background.setBounds (0,0,800,600) ;
		background.setOpaque(true);
                layer0.add (background, new Integer (0));
		getContentPane().add(layer0, BorderLayout.CENTER);



		//Pour le bouton
                retour = new Bouton (650,40,100,60);
                retour.setIcon(new ImageIcon(pathImage + "retour4.jpg" ));
                retour.addMouseListener(new java.awt.event.MouseAdapter()
                {
            @Override
                     public void mouseClicked(java.awt.event.MouseEvent evt)
                     {
                            System.out.println("retour 7->6");

                            Ecran6 ecran6 = new Ecran6(dataP);
                            ecran6.addBackground6();
                            ecran6.setVisible(true);
                            setVisible(false);

                     }
                 });




                 //Pour le titre
                 titre = new LabelOutils(100,50,500,50);
                 titre.addMessage("Liste des Equipes de la Poulpe Ligue", "Arial", 30, Color.orange);



                // Pour la liste
                Font font = new Font("Arial",Font.BOLD,20);

                String[] listeEquipes = dataP.listeEquipes(server.getPhase());
                int nbEquipes = listeEquipes.length;

                final JRadioButton[] equipe = new JRadioButton[nbEquipes];
                for (int i=0;i<nbEquipes;i++)
                {
                    equipe[i]=new JRadioButton();
                    equipe[i].setText(listeEquipes[i]);
                    equipe[i].setOpaque(false);
                    equipe[i].setFont(font);
                    equipe[i].setForeground(Color.blue);

                    if (i<8)
                    {
                        equipe[i].setBounds(100,140+i*50,250,50);

                    }
                    else
                    {
                        equipe[i].setBounds(350,140+(i-8)*50,250,50);
                    }

                    final int numEquipe = i;
                    final String teamName = listeEquipes[i];
                    //Indique si d'autres JRadioButtons sont aussi sélectionnés après lui dans la liste.
                     /*boolean autreBselected = false;
                        for (int k=i+1;k<nbEquipes;k++)
                        {
                            if (equipe[k].isSelected())
                            {
                                autreBselected = true ;
                                System.out.println(autreBselected);
                            }
                        }

                        if (autreBselected != true)
                        {*/
                            equipe[i].addMouseListener(new java.awt.event.MouseAdapter()
                            {
                        @Override
                            public void mouseClicked(java.awt.event.MouseEvent evt)
                            {
                                 System.out.println("retour 7->E");

                                EcranE ecranEquipe = new EcranE(dataP,teamName,numEquipe);
                                ecranEquipe.addBackgroundE();
                                ecranEquipe.setVisible(true);
                            }
                            });
                        }
                    
                               



		// On ajoute les composants
		layer0.add (retour,new Integer (1));
                layer0.add (titre,new Integer (1));
                for (int i=0;i<16;i++)
                {
                    layer0.add (equipe[i],new Integer (1));
                }

                

	}


}
