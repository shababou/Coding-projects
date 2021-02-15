package IHMParieur;




import DataJoueur.PlayerDataParieur;
import Reseaux.TCP_SERVER;
import liguapoulpe.Tournament;

import java.awt.BorderLayout;
import java.awt.Color;

import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JLayeredPane;
import javax.swing.ImageIcon;




/**
 * L'écran 3 présente 4 options pour le parieur.
 */


public class Ecran3 extends JFrame
{
    // Pour communiquer avec le serveur
    private PlayerDataParieur dataP;
    private TCP_SERVER server;

     // Pour l'architecture de la fenêtre
    public String pathImage;

    private JLayeredPane layer0 ;
    private Bouton pariEnCours,nvParis,championnat;
    private LabelOutils pariez ;
    private JLabel background;
    private JButton resParis;



    
     public Ecran3(PlayerDataParieur _dataP)
	{
                dataP = _dataP ;
                pathImage = dataP.getPathImage();
                server = dataP.getServer();
                dataP.setT(server.getTournament());

                addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent e) {
				System.out.println("bye");
				dispose();
				System.exit(0);
			}
		});



                //Définit le titre de la fenêtre.
                this.setTitle("Paris en ligne");
                //Définit la taille de la fenêtre.
                this.setSize(800, 600);
                //Positionne la fenêtre au centre de l'écran.
                this.setLocationRelativeTo(null);
                //Empêche le redimensionnement de la fenêtre.
                this.setResizable(false);
	}




/**
* On construit le fond d'écran avec les composants (boutons et titres).
* Méthode ne nécessitant aucun paramètre.
*/
	public void addBackground3()
	{
                layer0 = new JLayeredPane();

		//Pour le fond d'écran
		background = new JLabel (new ImageIcon (pathImage + "paris_en_ligne.jpg"));
		background.setBounds (0,0,800,600) ;
		background.setOpaque(true);
                layer0.add (background, new Integer (0));
		getContentPane().add(layer0, BorderLayout.CENTER);


		//Pour les boutons
                pariEnCours = new Bouton (50,150,250,50);
                pariEnCours.setIcon(new ImageIcon(pathImage + "paris en cours.jpg" ));
                pariEnCours.addMouseListener(new java.awt.event.MouseAdapter()
                {
            @Override
                     public void mouseClicked(java.awt.event.MouseEvent evt)
                     {
                            System.out.println("consulter les paris en cours");

                            Ecran4 ecran4 = new Ecran4(dataP);

                            if (dataP.nbParisEnCours()==0)
                            {
                                ecran4.addBackground4();
                                ecran4.setVisible(true);
                                setVisible(false);
                            }
                            else
                            {
                                ecran4.addBackground4bis();
                                ecran4.setVisible(true);
                                setVisible(false);
                            }

                     }
                    });


                nvParis = new Bouton (200,250,250,50);
                nvParis.setIcon(new ImageIcon(pathImage + "nv paris.jpg" ));
                nvParis.addMouseListener(new java.awt.event.MouseAdapter()
                {
            @Override
                     public void mouseClicked(java.awt.event.MouseEvent evt)
                     {
                            if(dataP.getTournament().getCOB().getPunter(dataP.getNumPunter()).getState()==false)
                            {
                            System.out.println("Pariez !");

                            Ecran5 ecran5 = new Ecran5(dataP);
                            ecran5.addBackground5();
                            ecran5.setVisible(true);
                            setVisible(false);
                            }
                     }
                    });


                championnat = new Bouton (350,350,250,50);
                championnat.setIcon(new ImageIcon(pathImage + "championnat.jpg" ));
                championnat.addMouseListener(new java.awt.event.MouseAdapter()
                {
            @Override
                     public void mouseClicked(java.awt.event.MouseEvent evt)
                     {
                            System.out.println("consulter le championnat");

                            Ecran6 ecran6 = new Ecran6(dataP);
                            ecran6.addBackground6();
                            ecran6.setVisible(true);
                            setVisible(false);


                            //for(int k =0; k<dataP.getTournament().getCOB().getPunter(0).getBets().size();k++)
                            //{System.out.println("Pari n° " +(k) +" = " +(dataP.getTournament().getCOB().getPunter(0).getBets().get(k)));}

                            //for(int k =0; k<dataP.getTournament().getCOB().getPunter(0).getAmount().size();k++)
                            //{System.out.println("Montant n° " +(k) +" = " +(dataP.getTournament().getCOB().getPunter(0).getAmount().get(k)));}


                     }
                    });

                    

                
                resParis = new Bouton (500,450,250,50);
                resParis.setIcon(new ImageIcon(pathImage + "parisPrecedents.jpg" ));
                resParis.addMouseListener(new java.awt.event.MouseAdapter()
                {
                @Override
                     public void mouseClicked(java.awt.event.MouseEvent evt)
                     {
                            System.out.println("consulter les gains");

                            for(int k =0; k<dataP.getTournament().getCOB().getPunter(0).getGains().size();k++)
                            {System.out.println("Gains n° " +(k) +" = " +(dataP.getTournament().getCOB().getPunter(0).getGains().get(k)));}


                            EcranGains ecran5 = new EcranGains(dataP);
                            ecran5.addBackgroundG();
                            ecran5.setVisible(true);
                            setVisible(false);

                            
                            
                     }
                    });



                //Pour le titre
                pariez = new LabelOutils(45,50,710,50);
                pariez.addMessage("Pariez sur les Matchs de la Poulpe Ligue !", "Arial", 38, Color.red);



		// On ajoute les composants
		layer0.add (pariEnCours,new Integer (1));
		layer0.add (nvParis,new Integer (1));
                layer0.add (championnat,new Integer (1));
                layer0.add (resParis,new Integer (1));
                layer0.add (pariez,new Integer (1));
            

	}
}
