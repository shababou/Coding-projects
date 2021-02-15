package IHMParieur;



import DataJoueur.PlayerDataParieur;
import liguapoulpe.Tournament;
import Reseaux.TCP_SERVER;

import java.awt.BorderLayout;
import java.awt.Color;

import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import java.util.ArrayList;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JLayeredPane;



/**
 * L'écran 8 permet au parieur de pouvoir suivre, sur l'arbre du tournoi, le déroulement du championnat.
 */
public class Ecran8 extends JFrame
{
    // Communication avec le serveur
    private PlayerDataParieur dataP;
    private TCP_SERVER server;

    private int numPhase;

    // Composants de la fenêtre
    public String pathImage  ;

    private JLayeredPane layer0 ;
    private Bouton retour;
    private LabelOutils titre;
    private JLabel background,arbre;


/**
  * Le constructeur avec en paramètre un PlayerDataParieur et le numéro de la phase du match (int de 0 à 6)
  */
    public Ecran8(PlayerDataParieur _dataP,int _numPhase)
	{
                dataP = _dataP ;
                server = dataP.getServer();
                dataP.setT(server.getTournament());

                numPhase=_numPhase;
                pathImage=dataP.getPathImage();

		addWindowListener(new WindowAdapter() {
                @Override
			public void windowClosing(WindowEvent e) {
				System.out.println("bye");
				dispose();
				System.exit(0);
			}
		});



                //Définit le titre de la fenêtre.
                this.setTitle("Le déroulement du tournoi");
                //Définit la taille de la fenêtre.
                this.setSize(1200,750);
                //Positionne la fenêtre au centre de l'écran.
                this.setLocationRelativeTo(null);
                //Empêche le redimensionnement de la fenêtre.
                this.setResizable(false);
	}



/**
* On construit le fond d'écran avec les composants (boutons et titres)
*/
	void addBackground8()
	{
                layer0 = new JLayeredPane();

		//Pour le fond d'écran
		background = new JLabel (new ImageIcon (pathImage + "stade.jpg"));
		background.setBounds (0,0,1200,750) ;
		background.setOpaque(true);
                layer0.add (background, new Integer (0));
		getContentPane().add(layer0, BorderLayout.CENTER);

		//Pour le bouton
                retour = new Bouton (1070,650,100,60);
                retour.setIcon(new ImageIcon(pathImage + "retour4.jpg" ));
                retour.addMouseListener(new java.awt.event.MouseAdapter()
                {
                @Override
                     public void mouseClicked(java.awt.event.MouseEvent evt)
                     {
                            System.out.println("retour 8->6");

                            Ecran6 ecran6 = new Ecran6(dataP);
                            ecran6.addBackground6();
                            ecran6.setVisible(true);
                            setVisible(false);

                     }
                 });


                 // Pour l'arbre
                 arbre = new JLabel();
                 arbre.setBounds(100,80,1000,550);
                 arbre.setIcon(new ImageIcon (pathImage + "arbreTournoi.jpg"));

                 //Pour afficher les matchs et leurs résultats en temps réel
                 LabelOutils[] matchs = new LabelOutils[31];
                 LabelOutils[] resultats = new LabelOutils[31];

                 ArrayList<String[]> branches = dataP.voirMatchs(numPhase);
                 System.out.println(numPhase);
                 System.out.println("size = " +branches.size());

                 
                 
                 if(numPhase<3)
                 {
                    for (int i=0;i<24;i++)
                    {
                        if(i<6)
                        {
                            matchs[i] = new LabelOutils(185,132+i*16,150,10);
                            matchs[i].addMessage(branches.get(i)[0], "Arial",12, Color.blue);

                            resultats[i]= new LabelOutils(350,132+i*16,50,10);
                            resultats[i].addMessage(branches.get(i)[1], "Arial",12, Color.blue);
                        }
                        else if(i<12)
                        {
                            matchs[i] = new LabelOutils(185,163+i*16,150,10);
                            matchs[i].addMessage(branches.get(i)[0], "Arial",12, Color.blue);

                            resultats[i]= new LabelOutils(350,163+i*16,50,10);
                            resultats[i].addMessage(branches.get(i)[1], "Arial",12, Color.blue);
                        }
                        else if(i<18)
                        {
                            matchs[i] = new LabelOutils(185,194+i*16,150,10);
                            matchs[i].addMessage(branches.get(i)[0], "Arial",12, Color.blue);

                            resultats[i]= new LabelOutils(350,194+i*16,50,10);
                            resultats[i].addMessage(branches.get(i)[1], "Arial",12, Color.blue);
                        }
                        else if(i<24)
                        {
                            matchs[i] = new LabelOutils(185,225+i*16,150,10);
                            matchs[i].addMessage(branches.get(i)[0], "Arial",12, Color.blue);

                            resultats[i]= new LabelOutils(350,225+i*16,50,10);
                            resultats[i].addMessage(branches.get(i)[1], "Arial",12, Color.blue);
                        }
                    }
                 }
                 else if(numPhase==3)
                 {
                     for (int i=0;i<24;i++)
                     {
                        if(i<6)
                        {
                            matchs[i] = new LabelOutils(185,132+i*16,150,10);
                            matchs[i].addMessage(branches.get(i)[0], "Arial",12, Color.blue);

                            resultats[i]= new LabelOutils(350,132+i*16,50,10);
                            resultats[i].addMessage(branches.get(i)[1], "Arial",12, Color.blue);
                        }
                        else if(i<12)
                        {
                            matchs[i] = new LabelOutils(185,163+i*16,150,10);
                            matchs[i].addMessage(branches.get(i)[0], "Arial",12, Color.blue);

                            resultats[i]= new LabelOutils(350,163+i*16,50,10);
                            resultats[i].addMessage(branches.get(i)[1], "Arial",12, Color.blue);
                        }
                        else if(i<18)
                        {
                            matchs[i] = new LabelOutils(185,194+i*16,150,10);
                            matchs[i].addMessage(branches.get(i)[0], "Arial",12, Color.blue);

                            resultats[i]= new LabelOutils(350,194+i*16,50,10);
                            resultats[i].addMessage(branches.get(i)[1], "Arial",12, Color.blue);
                        }
                        else if(i<24)
                        {
                            matchs[i] = new LabelOutils(185,225+i*16,150,10);
                            matchs[i].addMessage(branches.get(i)[0], "Arial",12, Color.blue);

                            resultats[i]= new LabelOutils(350,225+i*16,50,10);
                            resultats[i].addMessage(branches.get(i)[1], "Arial",12, Color.blue);
                        }
                    }
                    for (int i=24;i<28;i++)
                    {
                        matchs[i] = new LabelOutils(470,164+(i-24)*127,150,10);
                        matchs[i].addMessage(branches.get(i)[0], "Arial",12, Color.blue);

                        resultats[i]= new LabelOutils(505,180+(i-24)*127,50,10);
                        resultats[i].addMessage(branches.get(i)[1], "Arial",12, Color.blue);
                    }
                 }
                 else if(numPhase==4)
                 {
                     for (int i=0;i<24;i++)
                     {
                        if(i<6)
                        {
                            matchs[i] = new LabelOutils(185,132+i*16,150,10);
                            matchs[i].addMessage(branches.get(i)[0], "Arial",12, Color.blue);

                            resultats[i]= new LabelOutils(350,132+i*16,50,10);
                            resultats[i].addMessage(branches.get(i)[1], "Arial",12, Color.blue);
                        }
                        else if(i<12)
                        {
                            matchs[i] = new LabelOutils(185,163+i*16,150,10);
                            matchs[i].addMessage(branches.get(i)[0], "Arial",12, Color.blue);

                            resultats[i]= new LabelOutils(350,163+i*16,50,10);
                            resultats[i].addMessage(branches.get(i)[1], "Arial",12, Color.blue);
                        }
                        else if(i<18)
                        {
                            matchs[i] = new LabelOutils(185,194+i*16,150,10);
                            matchs[i].addMessage(branches.get(i)[0], "Arial",12, Color.blue);

                            resultats[i]= new LabelOutils(350,194+i*16,50,10);
                            resultats[i].addMessage(branches.get(i)[1], "Arial",12, Color.blue);
                        }
                        else if(i<24)
                        {
                            matchs[i] = new LabelOutils(185,225+i*16,150,10);
                            matchs[i].addMessage(branches.get(i)[0], "Arial",12, Color.blue);

                            resultats[i]= new LabelOutils(350,225+i*16,50,10);
                            resultats[i].addMessage(branches.get(i)[1], "Arial",12, Color.blue);
                        }
                    }
                    for (int i=24;i<28;i++)
                    {
                        matchs[i] = new LabelOutils(470,164+(i-24)*127,150,10);
                        matchs[i].addMessage(branches.get(i)[0], "Arial",12, Color.blue);

                        resultats[i]= new LabelOutils(505,180+(i-24)*127,50,10);
                        resultats[i].addMessage(branches.get(i)[1], "Arial",12, Color.blue);
                    }
                    for (int i=28;i<30;i++)
                    {
                        matchs[i] = new LabelOutils(645,228+(i-28)*254,150,10);
                        matchs[i].addMessage(branches.get(i)[0], "Arial",12, Color.blue);

                        resultats[i]= new LabelOutils(675,244+(i-28)*254,50,10);
                        resultats[i].addMessage(branches.get(i)[1], "Arial",12, Color.blue);
                    }
                 }
                 if(numPhase==5)
                 {
                     for (int i=0;i<24;i++)
                     {
                        if(i<6)
                        {
                            matchs[i] = new LabelOutils(185,132+i*16,150,10);
                            matchs[i].addMessage(branches.get(i)[0], "Arial",12, Color.blue);

                            resultats[i]= new LabelOutils(350,132+i*16,50,10);
                            resultats[i].addMessage(branches.get(i)[1], "Arial",12, Color.blue);
                        }
                        else if(i<12)
                        {
                            matchs[i] = new LabelOutils(185,163+i*16,150,10);
                            matchs[i].addMessage(branches.get(i)[0], "Arial",12, Color.blue);

                            resultats[i]= new LabelOutils(350,163+i*16,50,10);
                            resultats[i].addMessage(branches.get(i)[1], "Arial",12, Color.blue);
                        }
                        else if(i<18)
                        {
                            matchs[i] = new LabelOutils(185,194+i*16,150,10);
                            matchs[i].addMessage(branches.get(i)[0], "Arial",12, Color.blue);

                            resultats[i]= new LabelOutils(350,194+i*16,50,10);
                            resultats[i].addMessage(branches.get(i)[1], "Arial",12, Color.blue);
                        }
                        else if(i<24)
                        {
                            matchs[i] = new LabelOutils(185,225+i*16,150,10);
                            matchs[i].addMessage(branches.get(i)[0], "Arial",12, Color.blue);

                            resultats[i]= new LabelOutils(350,225+i*16,50,10);
                            resultats[i].addMessage(branches.get(i)[1], "Arial",12, Color.blue);
                        }
                    }
                    for (int i=24;i<28;i++)
                    {
                        matchs[i] = new LabelOutils(470,164+(i-24)*127,150,10);
                        matchs[i].addMessage(branches.get(i)[0], "Arial",12, Color.blue);

                        resultats[i]= new LabelOutils(505,180+(i-24)*127,50,10);
                        resultats[i].addMessage(branches.get(i)[1], "Arial",12, Color.blue);
                    }
                    for (int i=28;i<30;i++)
                    {
                        matchs[i] = new LabelOutils(645,228+(i-28)*254,150,10);
                        matchs[i].addMessage(branches.get(i)[0], "Arial",12, Color.blue);

                        resultats[i]= new LabelOutils(675,244+(i-28)*254,50,10);
                        resultats[i].addMessage(branches.get(i)[1], "Arial",12, Color.blue);
                    }
                     
                    matchs[30] = new LabelOutils(816,355,150,10);
                    matchs[30].addMessage(branches.get(30)[0], "Arial",12, Color.blue);

                    resultats[30]= new LabelOutils(855,371,50,10);
                    resultats[30].addMessage(branches.get(30)[1], "Arial",12, Color.blue);
                 }  
                 
               

                 //Pour le titre
                 titre = new LabelOutils(400,20,400,50);
                 titre.addMessage("Arbre du Championnat", "Arial", 35, Color.blue);


		// On ajoute les composants
		layer0.add (retour,new Integer (1));
		layer0.add (arbre,new Integer (1));
                layer0.add (titre,new Integer (1));

                int nbCases = 0;
                if (numPhase<3){nbCases=24;}
                if (numPhase==3){nbCases=28;}
                if (numPhase==4){nbCases=30;}
                if (numPhase==5){nbCases=31;}
                
                for (int i=0;i<nbCases;i++)
                {
                    layer0.add (matchs[i],new Integer (2));
                    layer0.add (resultats[i],new Integer (2));
                }


	}

}
