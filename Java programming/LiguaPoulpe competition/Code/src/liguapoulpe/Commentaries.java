
package liguapoulpe;


import java.util.ArrayList;
import java.io.Serializable;

/**
 * builds an array of five comments for a team depending on the results of its last game.
 */
public class Commentaries implements Serializable
{
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////ATTRIBUTES//////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  Team team;
  String[][] listCommentaries = new String[5][2]; // List of comments : the first column contains the commentaries and the second their effect on happiness.
  // There are seven types of comments as possible, depending on the results of the last game.
  ArrayList<String[]> comToFailure = new ArrayList<String[]>(); 
  ArrayList<String[]> comToWinning = new ArrayList<String[]>();
  ArrayList<String[]> comToFailureHard = new ArrayList<String[]>();
  ArrayList<String[]> comToWinningHard = new ArrayList<String[]>();
  ArrayList<String[]> comToNoob = new ArrayList<String[]>();
  ArrayList<String[]> comForStart = new ArrayList<String[]>();
  ArrayList<String[]> comForQuarters = new ArrayList<String[]>();


  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////CONSTRUCTOR/////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  public Commentaries(Team team)
  {
    String[] t1={"On fera mieux la prochaine fois","3"};comToFailure.add(0,t1);
    String[] t2={"Le prochain match sera meilleur","4"};comToFailure.add(1,t2);
    String[] t3={"Mobilisez-vous!!","-3"};comToFailure.add(2,t3);
    String[] t4={"J'ai passé une très mauvaise soirée! Je me suis ennuyé!","-4"};comToFailure.add(3,t4);
    String[] t5={"Il faudra reprendre les fondamentaux pour gagner le prochain match","1"};comToFailure.add(4,t5);
    String[] t6={"Je n'est rien retrouvé de ce que l'on a travaillé à l'entrainement. Je suis déçu.","-2"};comToFailure.add(5,t6);
    String[] t7={"Il faut aller plus de l'avant! Aller à l'encontre du ballon! Ne pas le subir!","-1"};comToFailure.add(6,t7);
    String[] t8={"Vous avez manqué d'audace ce soir, mais ce n'était pas un si mauvais match.","2"};comToFailure.add(7,t8);
    String[] t9={"J'ai confiance en vous. Je crois en vous.","5"};comToFailure.add(8,t9);
    String[] t10={"Ca va aller. Ne vous laissez pas abattre!","4"};comToFailure.add(9,t10);

    String[] t11={"Bien. Bon résultat","1"};comToWinning.add(0,t11);
    String[] t12={"On aurait pu faire mieux, mais c'est déjà pas mal!","-2"};comToWinning.add(1,t12);
    String[] t13={"Très bien! Je suis ravi!","2"};comToWinning.add(2,t13);
    String[] t14={"On n'est pas passé loin de la catastrophe...","-3"};comToWinning.add(3,t14);
    String[] t15={"Cette victoire est celle de tout un groupe, solide, ce soir!!","3"};comToWinning.add(4,t15);
    String[] t16={"Tout ce que l'on a travaillé à l'entrainement y était. Super!","4"};comToWinning.add(5,t16);
    String[] t17={"Je suis fier de vous ce soir","5"};comToWinning.add(6,t17);
    String[] t18={"Je suis satisfait de cette victoire!","2"};comToWinning.add(7,t18);
    String[] t19={"Un bon jeu collectif! Je suis très heureux ce soir","4"};comToWinning.add(8,t19);
    String[] t20={"Allez!!  Il faut continuer ainsi!!","3"};comToWinning.add(9,t20);

    String[] t21={"Vous comptiez en prendre combien comme ça? Vous me faites pitié!","-5"};comToFailureHard.add(0,t21);
    String[] t22={"Catastrophique!! On dirait la bande à Domenech!!","-3"};comToFailureHard.add(1,t22);
    String[] t23={"Ca va sans dire: il faut travailler le secteur défensif!","1"};comToFailureHard.add(2,t23);
    String[] t24={"Je n'est aucun commentaire à faire!","0"};comToFailureHard.add(3,t24);
    String[] t25={"Nul! Nul! Nul! Vous êtes faibles!","-4"};comToFailureHard.add(4,t25);
    String[] t26={"Je crois  qu'on est loin du compte...","1"};comToFailureHard.add(5,t26);
    String[] t27={"Ne perdez pas confiance. Croyez en vous! Moi j'y crois! Ca ne se reproduira plus","5"};comToFailureHard.add(6,t27);
    String[] t28={"On est passé au travers ce soir, mais ca sera mieux la prochaine fois","3"};comToFailureHard.add(7,t28);
    String[] t29={"Pas de panique! On va rectifier le tir. Il y a eu des bonnes choses ce soir","4"};comToFailureHard.add(8,t29);
    String[] t30={"On a été victime d'un manque de chance terrible! On avait le match en main...","2"};comToFailureHard.add(9,t30);

    String[] t31={"Sensationnel!!","2"};comToWinningHard.add(0,t31);
    String[] t32={"C'était tout simplement magique. Bravo les gars!!","3"};comToWinningHard.add(1,t32);
    String[] t33={"Vous m'avez bluffé ce soir. Je n'en reviens pas!","4"};comToWinningHard.add(2,t33);
    String[] t34={"C'est incroyable ce que vous êtes capable de produire lorsque vous êtes motivés!","-1"};comToWinningHard.add(3,t34);
    String[] t35={"Hip! Hip! Hip! Hourra!!","4"};comToWinningHard.add(4,t35);
    String[] t36={"Atchik! Atchik! Atchik! ... Aïe! Aïe! Aïe!","5"};comToWinningHard.add(5,t36);
    String[] t37={"Bravo les gars! Vous avez fait du très bon boulot!","2"};comToWinningHard.add(6,t37);
    String[] t38={"On les a atomisés! Vous avez vu leurs troches à la sortie...","1"};comToWinningHard.add(7,t38);
    String[] t39={"Voilà qui alimente les rêves!! Vous nous avez envoyé du rêve ce soir!!","5"};comToWinningHard.add(8,t39);
    String[] t40={"Je crois que c'est clair: on était les meilleurs ce soir!","0"};comToWinningHard.add(9,t40);

    String[] t41={"Un nul bien mérité!","1"};comToNoob.add(0,t41);
    String[] t42={"On aurait pu le gagner ce match !!","-2"};comToNoob.add(1,t42);
    String[] t43={"On a perdu 2 points ce soir. Il faudra mieux faire...","-1"};comToNoob.add(2,t43);
    String[] t44={"Un match nul qui n'est pas si mal que ça finalement","2"};comToNoob.add(3,t44);
    String[] t45={"On les a laissés jouer: résultat, on se fait reprendre sur la fin !!","-1"};comToNoob.add(4,t45);
    String[] t46={"Il faut réussir à garder le score!","-3"};comToNoob.add(5,t46);

    String[] t47={"Motivés les gars? Allons-y ...","1"};comForStart.add(0,t47);
    String[] t48={"Il faut bien débuter le tournoi. Ca va aller très vite !!!","-2"};comForStart.add(1,t48);
    String[] t49={"Ne surtout pas perdre le premier match, c'est le plus important","-1"};comForStart.add(2,t49);
    String[] t50={"On va gagner! On va gagner! On va gagner!","2"};comForStart.add(3,t50);
    String[] t51={"C'est bon? Vous y êtes?","-1"};comForStart.add(4,t51);
    String[] t52={"Et c'est parti! Le moment que vous avez tant rêvé: c'est maintenant!","2"};comForStart.add(5,t52);
    String[] t53={"Des questions?... Non. Alors aller! A l'abordage!","2"};comForStart.add(6,t53);
    String[] t54={"Je crois en vous! Ca va marcher!","4"};comForStart.add(7,t54);
    String[] t55={"Je crois que le plus important pour ce premier match est d'être serein","-2"};comForStart.add(8,t55);
    String[] t56={"On n'a pas fait tout ce boulot pour rien les gars. C'est maintenant!","-3"};comForStart.add(9,t56);
    String[] t57={"Go! Go! Go!","5"};comForStart.add(10,t57);

    String[] t58={"Nous sommes en quarts!! Nous sommes en quarts!","1"};comForQuarters.add(0,t58);
    String[] t59={"Félicitations les gars! Vous l'avez méritée cette qualification!","-2"};comForQuarters.add(1,t59);
    String[] t60={"Ce fut un premier tour compliqué, mais nous y sommes!","-1"};comForQuarters.add(2,t60);
    String[] t61={"Ne pas s'enflammer! L'histoire n'est pas finie!","2"};comForQuarters.add(3,t61);
    String[] t62={"On peut déjà dire qu'on a gagné!","-1"};comForQuarters.add(4,t62);
    String[] t63={"Alors, comment vous sentez-vous? Bien pas vrai? héhé...","2"};comForQuarters.add(5,t63);
    String[] t64={"Il faut aller en demi maintenant! Go!","2"};comForQuarters.add(6,t64);
    String[] t65={"Vous êtes les meilleurs, vous êtes vraiment les meilleurs!!","4"};comForQuarters.add(7,t65);
    String[] t66={"Vous pouvez, dès ce soir, être très fiers de vous!","-2"};comForQuarters.add(8,t66);
    String[] t67={"Je crois que bon, maintenant, ce n'est que du bonus","-3"};comForQuarters.add(9,t67);
    String[] t68={"Ouarf! On a eu chaud!!!","5"};comForQuarters.add(10,t68);


    this.team = team;
    int[] t = new int[3];
    for(int i=0; i<3; i++){t[i] = team.getWXFresults()[team.getGameNumber()][i];}
    if(team.getGameNumber()==0)
    {
      int r = 9;
      for(int i=0;i<5;i++)
      {
        int n = (int)(Math.random()*r);
        listCommentaries[i][0] = comForStart.get(n)[0];listCommentaries[i][1] = comForStart.get(n)[1];
        comForStart(n);
        r--;
      }
    }
    else if(team.getGameNumber()==4)
    {
      int r = 9;
      for(int i=0;i<5;i++)
      {
        int n = (int)(Math.random()*r);
        listCommentaries[i][0] = comForQuarters.get(n)[0];listCommentaries[i][1] = comForQuarters.get(n)[1];
        comForQuarters(n);
        r--;
      }
    }
    else if(t[0]==0) // Last game won
    {
 
      if(t[1]-t[2]>=3) // Big success
      {
        int r = 9;
        for(int i=0;i<=2;i++)
        {
          int n = (int)(Math.random()*r);
          listCommentaries[i][0] = comToWinning.get(n)[0];listCommentaries[i][1] = comToWinning.get(n)[1];
          remToWinning(n);
          r--;
        }
        r = 9;
        for(int i=3;i<5;i++)
        {
          int n = (int)(Math.random()*r);
          listCommentaries[i][0] = comToWinningHard.get(n)[0];listCommentaries[i][1] = comToWinningHard.get(n)[1];
          remToWinningHard(n);
          r--;
        }
      }
      else
      {
        int r = 9;
        for(int i=0;i<5;i++)
        {
          int n = (int)(Math.random()*r);
          listCommentaries[i][0] = comToWinning.get(n)[0];listCommentaries[i][1] = comToWinning.get(n)[1];
          remToWinning(n);
          r--;
        }
      }
    }
    else if(t[0]==2) // Last game lost
    {
      if(t[2]-t[1]>=3) // Big failure
      {
        int r = 9;
        for(int i=0;i<=2;i++)
        {
          int n = (int)(Math.random()*r);
          listCommentaries[i][0] = comToFailureHard.get(n)[0];listCommentaries[i][1] = comToFailureHard.get(n)[1];
          remToFailureHard(n);
          r--;
        }
        r = 9;
        for(int i=3;i<5;i++)
        {
          int n = (int)(Math.random()*r);
          listCommentaries[i][0] = comToFailure.get(n)[0];listCommentaries[i][1] = comToFailure.get(n)[1];
          remToFailure(n);
          r--;
        }
      }
      else
      {
        int r = 9;
        for(int i=0;i<5;i++)
        {
          int n = (int)(Math.random()*r);
          listCommentaries[i][0] = comToFailure.get(n)[0];listCommentaries[i][1] = comToFailure.get(n)[1];
          remToFailure(n);
          r--;
        }
      }
    }
    else if(t[0]==1)
    {
       int r = 5;
       for(int i=0;i<5;i++)
       {
          int n = (int)(Math.random()*r);
          listCommentaries[i][0] = comToNoob.get(n)[0];listCommentaries[i][1] = comToNoob.get(n)[1];
          remToNoob(n);
          r--;
        }
    }
  sendCommentaries();
}


  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////SETTERS//////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

/**Removes the Nieme comment in comToWinning**/
private void remToWinning(int n){comToWinning.remove(n);}

/**Removes the Nieme comment in comToWinningHard**/
private void remToWinningHard(int n){comToWinningHard.remove(n);}

/**Removes the Nieme comment in comToFailure**/
private void remToFailure(int n){comToFailure.remove(n);}

/**Removes the Nieme comment in comToFailureHard**/
private void remToFailureHard(int n){comToFailureHard.remove(n);}

/**Removes the Nieme comment in comToNoob**/
private void remToNoob(int n){comToNoob.remove(n);}

/**Removes the Nieme comment in comForStart**/
private void comForStart(int n){comForStart.remove(n);}

/**Removes the Nieme comment in comForQuarters**/
private void comForQuarters(int n){comForQuarters.remove(n);}


  //////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////OTHER METHODS////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

/**
 * Returns an array with in the first column a selction of five comments for the
 * team, and in the second column an indicator of their effect on happiness.
 */
public String[][] sendCommentaries()
{
  String[][] com = new String[5][2];
  for(int i=0;i<5;i++)
  {
    com[i][0] = listCommentaries[i][0];
    com[i][1] =  listCommentaries[i][1];
  }
  return com;
}


}

