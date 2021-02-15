package IHMParieur;



import DataJoueur.PlayerDataParieur;
import liguapoulpe.Clock;
import Reseaux.*;

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
 * L'écran 5 permet au joueur de consulter la liste des paris disponibles
 * et de sélectionner le match sur lequel il veut parier.
 */



public class Ecran5 extends JFrame
{
    // Pour communiquer avec le serveur
    private PlayerDataParieur dataP;
    private TCP_SERVER server;
    private String IPserver;
    private int port,numPunter;


    // Pour l'architecture de la fenêtre
    public String pathImage ;

    private JLayeredPane layer0 ;
    private Bouton retour,ok,validerParis ;
    private LabelOutils nbVies,attention;
    private JLabel background;
 
    

    public Ecran5(PlayerDataParieur _dataP)
	{
                dataP = _dataP ;
                IPserver = dataP.getIPserver();
                port = dataP.getPort();
                server = dataP.getServer();
                dataP.setT(server.getTournament());

                numPunter = dataP.getNumPunter();

                pathImage = dataP.getPathImage();

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
                this.setTitle("Espace Paris en ligne");
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
	void addBackground5()
	{
                layer0 = new JLayeredPane();

		//Pour le fond d'écran
		background = new JLabel (new ImageIcon (pathImage + "parisLigne.jpg"));
		background.setBounds (0,0,800,600) ;
		background.setOpaque(true);
                layer0.add (background, new Integer (0));
		getContentPane().add(layer0, BorderLayout.CENTER);

		

                //Pour les indications
                nbVies = new LabelOutils(600,50,50,25);
                String nb =  String.valueOf(dataP.nbViesPoulpe());
                nbVies.addMessage(nb,"Arial", 23, Color.blue);

                
                attention = new LabelOutils(10,530,600,50);
                attention.addMessage("ATTENTION : vous devez pariez dans l'ordre des matchs !", "Arial", 20, Color.black);

                 


                //Pour la lite des matchs
                Font font = new Font("Arial",Font.ROMAN_BASELINE,20);
                final int nbParisDispo = dataP.nbParisDisponibles(numPunter);
                final String[][] parisDispo = dataP.voirParisDisponibles(numPunter);
                final JRadioButton[] matchs = new JRadioButton[nbParisDispo];


                //Tableau de boolean qui renvoie false pour les paris non effectués.
                final boolean[] notAppear = new boolean[nbParisDispo];
                for (int i=0;i<nbParisDispo;i++)
                {
                    boolean dejaEff = false;
                    if ((parisDispo[i][0]).equals("paris deja effectué"))
                    {
                        dejaEff=true;
                    }

                    notAppear[i]=dejaEff;
                    System.out.println(notAppear[i]);
                }

                

                for (int i=0;i<nbParisDispo;i++)
                {
                    matchs[i]=new JRadioButton();
                    matchs[i].setText(parisDispo[i][0] + " vs " + parisDispo[i][1]);
                    matchs[i].setOpaque(false);
                    matchs[i].setFont(font);
                    matchs[i].setForeground(Color.blue);

                    matchs[i].setBounds(200,180+i*40,400,50);
                }

                    
               //Pour les boutons
                ok = new Bouton (620,200,150,60);
                ok.setIcon(new ImageIcon(pathImage + "valider.jpg" ));
                if (dataP.nbViesPoulpe()>0)
                {
                    ok.addMouseListener(new java.awt.event.MouseAdapter()
                    {
                    @Override
                        public void mouseClicked(java.awt.event.MouseEvent evt)
                        {
                            System.out.println("validation");

                            //Empêche l'ouverture de la fenêtre de validation du pari si 2 boutons sont sélectionnés.
                            for (int i=0;i<nbParisDispo;i++)
                            {
                                if (matchs[i].isSelected()==true)
                                {
                                    //Indique si d'autres JRadioButtons sont aussi sélectionnés après lui dans la liste.
                                    boolean autreBselected = false;
                                    for (int j=i+1;j<nbParisDispo;j++)
                                    { 
                                        if (matchs[j].isSelected()) 
                                        {
                                            autreBselected = true ;
                                            i=nbParisDispo;
                                            System.out.println(autreBselected);
                                        }                                       
                                    }


                                    if (autreBselected != true)
                                    {
                                        EcranValidation validation = new EcranValidation(dataP,i,parisDispo[i][0],parisDispo[i][1]);
                                        validation.addBackgroundV();
                                        validation.setVisible(true);

                                        String message = "completer"+":"+String.valueOf(numPunter);
                                        int l = dataP.getTournament().getCOB().getPunter(numPunter).getAmount().size();

                                        for (int k=0;k<i;k++)
                                        {
                                            //Envoie au server une mise de 0 pour les paris précédents non effectués.
                                            if (notAppear[i]==false && notAppear[k]==false)
                                            {
                                                if(k>l-1)
                                                {message = message +":" +(k) ;}
                                            }
                                        }
                                        System.out.println(message);
                                        new TCP_CLIENT(IPserver,port,message).start() ;
                                        setVisible(false);
                                        
                                    }
                                }
                                                                    
                            }

                           
                        }
                  });
                }


                validerParis = new Bouton (620,300,150,60);
                validerParis.setIcon(new ImageIcon(pathImage + "clore.jpg" ));
                validerParis.addMouseListener(new java.awt.event.MouseAdapter()
                {
                @Override
                     public void mouseClicked(java.awt.event.MouseEvent evt)
                     {
                        int l = dataP.getTournament().getCOB().getPunter(numPunter).getBets().size();
                        int ld = dataP.nbParisDisponibles(numPunter);
                        String m = "completer"+":"+(numPunter);

                        for(int k=l; k<ld; k++) {m=m+":"+(k);}
                        new TCP_CLIENT(IPserver,port,m).start() ;


                        String message = "validateP:" + numPunter ;
                        new TCP_CLIENT(IPserver,port,message).start() ;

                        //setVisible(false);

                        Clock clock = new Clock(2);
                            clock.start();

                            while(true)
                            {
                                if(clock.getFlag())
                                {
                                     Ecran3 ecran3 = new Ecran3(dataP);
                                     ecran3.addBackground3();
                                     ecran3.setVisible(true);

                                    setVisible(false);
                                    break;
                                }
                                else{}

                            }
                       }
                });



                    
                retour = new Bouton (620,400,150,60);
                retour.setIcon(new ImageIcon(pathImage + "retour5.jpg" ));
                retour.addMouseListener(new java.awt.event.MouseAdapter()
                {
                @Override
                     public void mouseClicked(java.awt.event.MouseEvent evt)
                     {
                            System.out.println("retour 5->3");

                            Ecran3 ecran3 = new Ecran3(dataP);
                            ecran3.addBackground3();
                            ecran3.setVisible(true);
                            setVisible(false);

                     }
                 });

                    
                

		// On ajoute les composants
		layer0.add (retour,new Integer (1));
		layer0.add (nbVies,new Integer (1));
                layer0.add (ok, new Integer(1));

                // Dans le cas où le nombre de vies poulpe du parieur est nul ou négatif, on clot automatiquement les paris
                if (dataP.nbViesPoulpe()<1)
                {
                    String message = "validateP:" + numPunter ;
                    new TCP_CLIENT(IPserver,port,message).start() ;
                }
                else
                {
                    layer0.add (validerParis, new Integer(1));
                }

                
                for (int i=0;i<nbParisDispo;i++)
                {
                    if (notAppear[i]==false)
                    {
                        layer0.add (matchs[i],new Integer (1));
                    }
                }
                
                
	}
}
