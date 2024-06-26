// submitted by Julian Schacher (jspp)
using System;

namespace EuclideanAlgorithm
{
    class Program
    {
        static void Main(string[] args)
        {
            var euclideanAlgorithm = new EuclideanAlgorithm();
            int check = euclideanAlgorithm.EuclidMod(64 * 67, 64 * 81);
            int check2 = euclideanAlgorithm.EuclidSub(128 * 12, 128 * 77);

            Console.WriteLine("[#]\nModulus-based euclidean algorithm result:");
            Console.WriteLine(check);
            Console.WriteLine("[#]\nSubtraction-based euclidean algorithm result:");
            Console.WriteLine(check2);
        }
    }
}
